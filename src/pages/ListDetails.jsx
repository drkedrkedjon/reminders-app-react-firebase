import { useParams } from "react-router-dom";
import ReminderCard from "../componentes/ReminderCard";
import { useContext } from "react";
import { MyRemindersContext, MyUserUIDContext } from "../scripts/DataContexts";
import { ref as refDB, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";

export default function ListDetails() {
  const allReminders = useContext(MyRemindersContext);
  const { userUID } = useContext(MyUserUIDContext);
  const params = useParams();

  const filterThisListReminders = allReminders.filter(
    (reminder) => reminder[1].listID === params.id
  );

  function handleNewName(id, newName) {
    const updates = {};
    updates[`/reminders/${userUID}/${id}/title`] = newName;
    return update(refDB(db), updates);
  }

  function deleteReminder(id) {
    remove(refDB(db, `/reminders/${userUID}/${id}`));
  }

  const mapeo = filterThisListReminders.map((reminder) => (
    <ReminderCard
      key={reminder[0]}
      reminder={reminder[1]}
      id={reminder[0]}
      handleNewName={handleNewName}
      deleteReminder={deleteReminder}
    />
  ));

  return (
    <section className="list-details-container">
      <h2 className="list-title">Sasa</h2>
      {mapeo}
    </section>
  );
}
