/* eslint-disable react/prop-types */
export default function NewReminders({ handleVisibility }) {
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
        <div className="form-element-container">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" />
        </div>
        <div className="form-element-container">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" />
        </div>
        <div className="form-element-container">
          <label htmlFor="select-list">Select list</label>
          <select name="" id="select-list">
            <option value="">Supermercado</option>
            <option value="">Supermercado</option>
            <option value="">Supermercado</option>
            <option value="">Supermercado</option>
          </select>
        </div>
        <div className="form-element-container">
          <label htmlFor="flaged">Flaged</label>
          <input id="flaged" type="checkbox" />
        </div>
        <label htmlFor="image-upload">Image</label>
        <input id="image-upload" type="file" />
      </form>
    </div>
  );
}