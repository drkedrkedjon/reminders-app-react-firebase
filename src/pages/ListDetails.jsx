import { useParams } from "react-router-dom";
import ReminderCard from "../componentes/ReminderCard";
import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { remindersEnDB } from "../scripts/firebase";

export default function ListDetails() {
  const [thisListReminders, setThisListReminders] = useState([]);
  const params = useParams();

  useEffect(() => {
    const cancelOnValue = onValue(remindersEnDB, function (snapshot) {
      if (snapshot.val()) {
        const reminders = Object.entries(snapshot.val());
        const filterReminders = reminders.filter(
          (reminder) => reminder[1].listID === params.id
        );
        setThisListReminders(filterReminders);
      } else {
        setThisListReminders([]);
      }
    });
    return cancelOnValue;
  }, [params.id]);

  const mapeo = thisListReminders.map((reminder) => (
    <ReminderCard key={reminder[0]} data={reminder[1]} id={reminder[0]} />
  ));

  return (
    <section className="list-details-container">
      <h2 className="list-title">Nombre de la lista</h2>
      {mapeo}
    </section>
  );
}
