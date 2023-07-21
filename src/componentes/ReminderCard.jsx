/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flag } from "react-feather";

/* eslint-disable react/prop-types */
export default function ReminderCard({
  reminder,
  id,
  handleNewName,
  deleteReminder,
}) {
  const oldTitle = reminder.title;
  // console.log(reminder.imageName);

  const [reminderName, setReminderName] = useState(oldTitle);
  const [isDeletingList, setIsDeletingList] = useState(false);

  function handleReminderName(e) {
    setReminderName(e.target.value);
  }

  // Handle cambio de nombre
  useEffect(() => {
    if (oldTitle === reminderName) {
      return;
    }
    const timeout = setTimeout(() => {
      handleNewName(id, reminderName);
    }, 500);
    return () => clearTimeout(timeout);
  }, [reminderName]);

  //  Handle aplazar o deley delete
  useEffect(() => {
    if (!isDeletingList) {
      return;
    }
    const cancelTimeout = setTimeout(
      () => deleteReminder(id, reminder?.imageName),
      2000
    );
    return () => clearTimeout(cancelTimeout);
  }, [isDeletingList]);

  //  Para poner punto rojo
  const btnRedCancel = isDeletingList ? "cancel-" : "";

  return (
    <div className="reminder-card-container">
      <button
        onClick={() => setIsDeletingList(!isDeletingList)}
        // Aqui uso punto rojo
        className={`${btnRedCancel}delete-btn`}
      ></button>
      <input
        className="reminder-card-input"
        type="text"
        value={reminderName}
        onChange={handleReminderName}
      />
      {reminder.flaged && (
        <Flag className="reminder-card-flaged" color={"var(--color-red)"} />
      )}
      <Link to={`/reminder/${id}`} className="icono-flecha">
        <ArrowRight color={"var(--color-acentado)"} />
      </Link>
    </div>
  );
}
