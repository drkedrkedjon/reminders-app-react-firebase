/* eslint-disable react/prop-types */
export default function NewReminders({ handleVisibility }) {
  return (
    <div className="new-reminder-container">
      <div className="new-reminder--barra">
        <button onClick={() => handleVisibility("ajustes")}>Guardar</button>
      </div>
      <form className="new-reminder-lista">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" />
        <label htmlFor="note">Note</label>
        <textarea id="note" cols="3" />
        <div className="form-element-container">
          <label htmlFor="date">Set Date</label>
          <input id="date" type="date" placeholder="Set date" />
        </div>
        <div className="form-element-container">
          <label htmlFor="time">Set Time</label>
          <input id="time" type="time" placeholder="Set time" />
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
