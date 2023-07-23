import HomeListCard from "../componentes/HomeListCard";
import TableroCard from "../componentes/TableroCard";
import ReminderCard from "../componentes/ReminderCard";
import { useContext } from "react";
import {
  MyListsContext,
  MyRemindersContext,
  MyUserUIDContext,
  HomeDisplayTypeContext,
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
  const { homeType, setHomeType } = useContext(HomeDisplayTypeContext);

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
  // Filter Flagged
  const flagged = reminders.filter((reminder) => {
    return reminder[1].flaged === true;
  });
  // Filter Today
  const today = reminders.filter((reminder) => {
    const dbDate = new Date(reminder[1].date).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();
    return dbDate === todayDate;
  });
  // Filter Next 3 days
  const next3days = reminders.filter((reminder) => {
    const dbDate = new Date(reminder[1].date);
    const todayDate = new Date();
    return compareDates(todayDate, dbDate);
  });

  function handleFilter() {
    let filteredReminders = [];
    if (homeType === "flagged") {
      filteredReminders = flagged;
    }
    if (homeType === "today") {
      filteredReminders = today;
    }
    if (homeType === "next3days") {
      filteredReminders = next3days;
    }

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
          onClick={() => setHomeType("reminders")}
        />
        <TableroCard
          imagen={<Flag color="var(--color-red)" />}
          num={flagged.length}
          text="Flagged"
          date={false}
          color="var(--color)"
          onClick={() => setHomeType("flagged")}
        />
        <TableroCard
          imagen={<Watch color="var(--color-orange)" />}
          num={today.length}
          text=""
          date={true}
          color="var(--color)"
          onClick={() => setHomeType("today")}
        />
        <TableroCard
          imagen={<Calendar color="var(--color-acentado)" />}
          num={next3days.length}
          text="Next 3 days"
          date={false}
          color="var(--color)"
          onClick={() => setHomeType("next3days")}
        />
      </section>

      <section className="home-list-container">
        <h2 className="list-title">My Lists</h2>
        {homeType === "lists" && myLists}
        {homeType === "reminders" && allReminders}
        {(homeType === "flagged" || "today" || "next3days") && handleFilter()}
      </section>
    </main>
  );
}
