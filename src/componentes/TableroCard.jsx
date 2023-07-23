/* eslint-disable react/prop-types */
export default function TableroCard({
  onClick,
  imagen,
  num,
  text,
  date,
  color,
}) {
  const fechaHoy = new Date();
  return (
    <div onClick={onClick} className="tablero-card">
      <div className="tablero-card--firstrow">
        {imagen}
        <p style={{ color: `${color}` }} className="tablero-card--num">
          {num}
        </p>
      </div>
      <p className="tablero-card--date">
        {date ? `Today: ${fechaHoy.toLocaleDateString()}` : text}
      </p>
    </div>
  );
}
