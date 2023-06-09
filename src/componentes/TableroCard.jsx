/* eslint-disable react/prop-types */
export default function TableroCard({ src, alt, num, text, date, color }) {
  const fechaHoy = new Date();
  return (
    <div className="tablero-card">
      <div className="tablero-card--firstrow">
        <img className="tablero-card--img" src={src} alt={alt} />
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
