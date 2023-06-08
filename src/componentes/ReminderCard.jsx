import { useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ReminderCard({ reminder, id }) {
  console.log(reminder);

  const [reminderName, setReminderName] = useState("");

  function handleReminderName(e) {
    setReminderName(e.target.value);
  }

  return (
    <div className="reminder-card-container">
      <button className="cancel-delete-btn"></button>
      <input
        className="reminder-card-input"
        type="text"
        value={reminderName}
        onChange={handleReminderName}
      />
      {reminder.flaged && (
        <img
          className="reminder-card-flaged"
          src="/assets/bandera.png"
          alt=""
        />
      )}
      <Link to={`/reminder/${id}`} className="reminder-card-arrow">
        <img src="/assets/flecha-derecha.png" alt="" />
      </Link>
    </div>
  );
}
