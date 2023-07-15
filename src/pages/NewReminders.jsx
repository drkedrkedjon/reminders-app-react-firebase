/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { storageRef } from "../scripts/storage";
import { push, ref as refDB } from "firebase/database";
import {
  ref as refST,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { MyListsContext, MyUserUIDContext } from "../scripts/DataContexts";
import { db } from "../scripts/firebase";

export default function NewReminders() {
  const [selectedImage, setSelectedImage] = useState(null);
  const listContext = useContext(MyListsContext);
  const { userUID } = useContext(MyUserUIDContext);
  const [form, setForm] = useState({
    userID: "",
    listID: "",
    title: "",
    note: "",
    date: "",
    time: "",
    flaged: false,
    imageURL: "",
    imageName: "",
  });

  // Activar o desactivar el botton basado en si lista esta selecionada
  const isListSelected = useRef(false);
  form.listID
    ? (isListSelected.current = true)
    : (isListSelected.current = false);

  // Para redireccionar en router
  const navigate = useNavigate();

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
  // Guardar recordatorio en DB
  function handleSaveReminder() {
    push(refDB(db, `/reminders/${userUID}`), form).then(
      navigate(`/list/${form.listID}`)
    );
  }

  // Al seleccionar imagen, subir la misma en firebase storage
  // Luego obtener su URL y a final meter en el formulario de recordatorio
  useEffect(() => {
    if (!selectedImage) return;
    const imagesRef = refST(storageRef, `/${userUID}`);

    const fileRef = refST(imagesRef, selectedImage?.name);

    uploadBytes(fileRef, selectedImage).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setForm((oldData) => ({
          ...oldData,
          imageURL: url,
          imageName: selectedImage?.name,
        }));
      });
    });
  }, [selectedImage]);

  //  Para borrar imgane en storage
  function handleDeleteImage() {
    const imagesRef = refST(storageRef, `/${userUID}`);

    const fileRef = refST(imagesRef, form.imageName);
    deleteObject(fileRef).then(
      setForm((oldData) => ({
        ...oldData,
        imageURL: "",
        imageName: "",
      }))
    );
  }

  // Obtener listado de nombres de las listas para options in select element
  const mapeoSelectOption = listContext.map((list) => (
    <option key={list[0]} value={list[0]}>
      {list[1].name}
    </option>
  ));

  // console.log(form);

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
          <button
            disabled={!isListSelected.current}
            onClick={handleSaveReminder}
            className="btn-guardar"
          >
            {!isListSelected.current ? "Is List Selected?" : "Save"}
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
          <label htmlFor="select-list">Select List</label>
          <select
            id="select-list"
            name="listID"
            value={form.listID}
            onChange={handleForm}
          >
            <option value="">-- Select List --</option>
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
        {form.imageURL !== "" && <img src={form.imageURL} alt="" />}
        {!form.imageURL ? (
          <input
            id="image-upload"
            name="imageRef"
            type="file"
            accept="image/*"
            onChange={handleSelectedImage}
          />
        ) : (
          <button onClick={handleDeleteImage} className="delete-img">
            Delete Image
          </button>
        )}
      </div>
    </div>
  );
}
