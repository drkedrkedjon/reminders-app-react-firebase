import NewReminder from "./newReminder";
import { useState } from "react";

export default function BarraFooter() {
  const [newReminderVisibility, setNewReminderVisibility] = useState(false);

  function handleVisibility() {
    setNewReminderVisibility((oldValue) => !oldValue);
  }

  return (
    <div>
      <footer className="barra-footer-container">
        <button onClick={handleVisibility}>+ New Reminder</button>
      </footer>
      {newReminderVisibility && (
        <NewReminder handleVisibility={handleVisibility} />
      )}
    </div>
  );
}
