/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { imagesRef } from "../scripts/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewReminders() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    note: "",
    date: "",
    time: "",
    selectList: "",
    flaged: false,
    imageURL: "",
  });
  console.log(form.imageURL);
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

  return (
    <div className="new-reminder-container">
      <form className="new-reminder-lista">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleForm}
        />

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
            <option value="Supermercado">Supermercado</option>
            <option value="Sarajevo">Sarajevo</option>
            <option value="Esquiar">Esquiar</option>
            <option value="Bicicletas">Bicicletas</option>
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
      </form>
    </div>
  );
}
