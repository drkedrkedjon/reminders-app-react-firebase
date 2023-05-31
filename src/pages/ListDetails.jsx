import { useParams } from "react-router-dom";
import ReminderCard from "../componentes/ReminderCard";

export default function ListDetails() {
  const params = useParams();
  // console.log(params.id);

  return (
    <section className="list-details-container">
      <h2 className="list-title">Nombre de la lista</h2>

      <ReminderCard />
      <ReminderCard />
      <ReminderCard />
      <ReminderCard />
      <ReminderCard />
      <ReminderCard />
      <ReminderCard />
    </section>
  );
}
