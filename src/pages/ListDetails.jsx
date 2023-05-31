import { useParams } from "react-router-dom";

export default function ListDetails() {
  const params = useParams();
  // console.log(params.id);

  return (
    <section className="list-details-container">
      <h2 className="list-title">Nombre de la lista</h2>

      <div className="reminder-card-container">
        <button className="cancel-delete-btn"></button>
        <input className="reminder-card-input" type="text" />
        <img className="reminder-card-img" src="/assets/bandera.png" alt="" />
      </div>
    </section>
  );
}
