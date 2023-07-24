import { useParams } from "react-router-dom";
import ReminderCard from "../componentes/ReminderCard";
import { useContext } from "react";
import {
  MyRemindersContext,
  MyUserUIDContext,
  MyListsContext,
} from "../scripts/DataContexts";
import { ref as refDB, remove, update } from "firebase/database";
import { ref as refST, deleteObject } from "firebase/storage";
import { storageRef } from "../scripts/storage";
import { db } from "../scripts/firebase";

export default function ListDetails() {
  const allReminders = useContext(MyRemindersContext);
  const { userUID } = useContext(MyUserUIDContext);
  const allLists = useContext(MyListsContext);
  const params = useParams();

  // Filtrar listas para obtener en nombre de la actual
  const filterThisList = allLists.filter((list) => list[0] === params.id);
  const listName = filterThisList[0][1].name;

  const filterThisListReminders = allReminders.filter(
    (reminder) => reminder[1].listID === params.id
  );

  function handleNewName(id, newName) {
    const updates = {};
    updates[`/reminders/${userUID}/${id}/title`] = newName;
    return update(refDB(db), updates);
  }

  //  Para borrar imagan en storage y recordatorio tambien en database
  function deleteReminder(id, imageName) {
    console.log(imageName);
    if (imageName === "") {
      remove(refDB(db, `/reminders/${userUID}/${id}`));
    } else {
      const imagesRef = refST(storageRef, `/${userUID}`);
      const fileRef = refST(imagesRef, imageName);
      deleteObject(fileRef).then(
        remove(refDB(db, `/reminders/${userUID}/${id}`))
      );
    }
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
      <h2 className="list-title">{listName}</h2>
      {mapeo}
    </section>
  );
}
