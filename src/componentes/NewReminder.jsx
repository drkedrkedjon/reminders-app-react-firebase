/* eslint-disable react/prop-types */
export default function NewReminder({ handleVisibility }) {
  return (
    <div className="ajustes-container">
      <div className="ajustes-container--barra">
        <button onClick={() => handleVisibility("ajustes")}>Guardar</button>
      </div>
      <form className="new-reminder-lista">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" placeholder="New Reminder" />
        <label htmlFor="note">Note</label>
        <textarea id="note" placeholder="text area" cols="3" />
        <label htmlFor="date">Date</label>
        <input id="date" type="date" />
        <label htmlFor="time">Time</label>
        <input id="time" type="time" />
        <label htmlFor="select-list">Select list</label>
        <select name="" id="select-list">
          <option value="">Supermercado</option>
          <option value="">Supermercado</option>
          <option value="">Supermercado</option>
          <option value="">Supermercado</option>
        </select>
        <label htmlFor="flaged">Flaged</label>
        <input id="flaged" type="checkbox" checked />
        <label htmlFor="image-upload">Upload image</label>
        <input id="image-upload" type="file" />
      </form>
    </div>
  );
}
