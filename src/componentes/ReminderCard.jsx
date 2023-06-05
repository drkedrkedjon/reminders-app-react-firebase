/* eslint-disable react/prop-types */
export default function ReminderCard({ data, id }) {
  return (
    <div className="reminder-card-container">
      <button className="cancel-delete-btn"></button>
      <input className="reminder-card-input" type="text" value={data.title} />
      {data.flaged && (
        <img className="reminder-card-img" src="/assets/bandera.png" alt="" />
      )}
    </div>
  );
}
