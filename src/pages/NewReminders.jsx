/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { imagesRef } from "../scripts/storage";
import { listasEnDB } from "../scripts/firebase";
import { onValue, update, push, child } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewReminders() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lists, setLists] = useState([]);
  const [form, setForm] = useState({
    title: "",
    note: "",
    date: "",
    time: "",
    selectList: "",
    flaged: false,
    imageURL: "",
  });

  // Guardar imagen seleccionada en selectedImage state
  function handleSelectedImage(e) {
    setSelectedImage(e.target.files[0]);
  }

  // Manejar formulario y su state via onChange event
  function handleForm(e) {
    const { name, value, checked, type } = e.target;

    setForm((oldData) => ({
      ...oldData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSaveReminder() {
    // Get a key for a new Post.
    // const newRefLista = ref(listasEnDB, form.selectList);
    const newPostKey = push(child(listasEnDB, form.selectList + "items")).key;
    const updates = {};
    updates[listasEnDB + form.selectList + "items" + newPostKey] = form;
    update(listasEnDB, updates);
    // console.log(newPostKey);
  }

  // Al seleccionar imagen, subir la misma en firebase storage
  // Luego obtener su URL y a final meter en el formulario de recordatorio
  useEffect(() => {
    if (!selectedImage) return;

    const fileRef = ref(imagesRef, selectedImage?.name);

    uploadBytes(fileRef, selectedImage).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setForm((oldData) => ({
          ...oldData,
          imageURL: url,
        }));
      });
    });
  }, [selectedImage]);

  // Obtener los nombres de las listas para mapear para el elemnto select de formulario.
  useEffect(() => {
    const cancelOnValue = onValue(listasEnDB, function (snapshot) {
      if (snapshot.val()) {
        setLists(Object.entries(snapshot.val()));
      } else {
        setLists([]);
      }
    });

    return cancelOnValue;
  }, []);

  // Obtener listado de nombres de las listas para options in select element
  const mapeoSelectOption = lists.map((list) => (
    <option key={list[0]} value={list[0]}>
      {list[1].name}
    </option>
  ));

  return (
    <div className="new-reminder-container">
      <div className="new-reminder-lista">
        <label htmlFor="title">Title</label>
        <div className="title-btn-container">
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleForm}
          />
          <button onClick={handleSaveReminder} className="btn-guardar">
            Save
          </button>
        </div>

        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          name="note"
          value={form.note}
          onChange={handleForm}
        />

        <div className="form-element-container">
          <label htmlFor="select-list">Select list</label>
          <select
            id="select-list"
            name="selectList"
            value={form.selectList}
            onChange={handleForm}
          >
            {mapeoSelectOption}
          </select>
        </div>

        <div className="form-element-container">
          <label htmlFor="date">Set Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleForm}
          />
        </div>

        <div className="form-element-container">
          <label htmlFor="time">Set Time</label>
          <input
            id="time"
            type="time"
            name="time"
            value={form.time}
            onChange={handleForm}
          />
        </div>

        <div className="form-element-container">
          <label htmlFor="flaged">Flaged</label>
          <input
            id="flaged"
            type="checkbox"
            name="flaged"
            checked={form.flaged}
            onChange={handleForm}
          />
        </div>

        <label htmlFor="image-upload">Image</label>
        <input
          id="image-upload"
          name="imageRef"
          type="file"
          onChange={handleSelectedImage}
        />
      </div>
    </div>
  );
}
