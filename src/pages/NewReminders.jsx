import { useState } from "react";

/* eslint-disable react/prop-types */
export default function NewReminders() {
  const [form, setForm] = useState({
    title: "",
    note: "",
    date: "",
    time: "",
    selectList: "",
    flaged: true,
    imageRef: "",
  });

  function handleForm(e) {
    e.preventDefault();
  }

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
          <label htmlFor="select-list">Select list</label>
          <select
            id="select-list"
            name="select-list"
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
        <input id="image-upload" name="imageRef" type="file" />
      </form>
    </div>
  );
}
