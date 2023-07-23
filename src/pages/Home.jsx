import { useState } from "react";
import HomeListCard from "../componentes/HomeListCard";
import TableroCard from "../componentes/TableroCard";
import ReminderCard from "../componentes/ReminderCard";
import { useContext } from "react";
import {
  MyListsContext,
  MyRemindersContext,
  MyUserUIDContext,
} from "../scripts/DataContexts";
import { Flag, BookOpen, Watch, Calendar } from "react-feather";
import { ref as refDB, remove, update } from "firebase/database";
import { ref as refST, deleteObject } from "firebase/storage";
import { storageRef } from "../scripts/storage";
import { db } from "../scripts/firebase";

export default function Home() {
  const lists = useContext(MyListsContext);
  const reminders = useContext(MyRemindersContext);
  const { userUID } = useContext(MyUserUIDContext);
  // lists, reminders, flagged, today, next3days
  const [homeType, setHomeType] = useState("next3days");

  // Cambiar nombre de recordatorio
  function handleNewName(id, newName) {
    const updates = {};
    updates[`/reminders/${userUID}/${id}/title`] = newName;
    return update(refDB(db), updates);
  }
  //  Para borrar primero imagan en storage y luego tambien recordatorio en database
  function deleteReminder(id, imageName) {
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
  // Por defecto se muestran todas las listas
  const myLists = lists.map((lista) => {
    return <HomeListCard key={lista[0]} lista={lista} />;
  });
  // Para mostrar todos los recordatorios
  const allReminders = reminders.map((reminder) => {
    return (
      <ReminderCard
        key={reminder[0]}
        reminder={reminder[1]}
        id={reminder[0]}
        handleNewName={handleNewName}
        deleteReminder={deleteReminder}
      />
    );
  });
  // Compare two dates to see if they are  equal or less then three days beetwen them
  function compareDates(date1, date2) {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);
    if (date1Obj > date2Obj) return false;
    const diffTime = Math.abs(date2Obj - date1Obj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }

  function handleFilter() {
    const filteredReminders = reminders.filter((reminder) => {
      if (homeType === "flagged") {
        return reminder[1].flaged === true;
      }
      if (homeType === "today") {
        const dbDate = new Date(reminder[1].date).toLocaleDateString();
        const todayDate = new Date().toLocaleDateString();
        return dbDate === todayDate;
      }
      if (homeType === "next3days") {
        const dbDate = new Date(reminder[1].date);
        const todayDate = new Date();
        return compareDates(todayDate, dbDate);
      }
      return null;
    });

    return filteredReminders.map((reminder) => {
      return (
        <ReminderCard
          key={reminder[0]}
          reminder={reminder[1]}
          id={reminder[0]}
          handleNewName={handleNewName}
          deleteReminder={deleteReminder}
        />
      );
    });
  }

  return (
    <main className="home-container">
      <section className="tablero">
        <TableroCard
          imagen={<BookOpen color="var(--color-green)" />}
          num={reminders.length}
          text="All Reminders"
          date={false}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Flag color="var(--color-red)" />}
          num="7"
          text="Flagged"
          date={false}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Watch color="var(--color-orange)" />}
          num="3"
          text=""
          date={true}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Calendar color="var(--color-acentado)" />}
          num="14"
          text="Next 3 days"
          date={false}
          color="var(--color)"
        />
      </section>

      <section className="home-list-container">
        <h2 className="list-title">My Lists</h2>
        {homeType === "lists" && myLists}
        {homeType === "reminders" && allReminders}
        {(homeType === "flagged" || "today" || "next3days") && handleFilter()}
        {/* {homeType === "today" && handleFilter()}
        {homeType === "next3days" && handleFilter()} */}
      </section>
    </main>
  );
}
