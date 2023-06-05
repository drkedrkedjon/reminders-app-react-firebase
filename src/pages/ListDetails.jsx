import { Outlet } from "react-router-dom";
import ReminderCard from "../componentes/ReminderCard";
import { useContext } from "react";
import { MyRemindersContext } from "../scripts/DataContexts";

export default function ListDetails() {
  const thisListReminders = useContext(MyRemindersContext);

  const mapeo = thisListReminders.map((reminder) => (
    <ReminderCard key={reminder[0]} data={reminder[1]} id={reminder[0]} />
  ));

  return (
    <section className="list-details-container">
      <h2 className="list-title">Sasa</h2>
      {mapeo}
      <Outlet />
    </section>
  );
}
