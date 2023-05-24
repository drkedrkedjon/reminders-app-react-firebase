/* eslint-disable react/prop-types */
export default function Ajustes({ handleVisibility }) {
  return (
    <div className="ajustes-container">
      <div className="ajustes-container--barra">
        <button onClick={() => handleVisibility("ajustes")}>Return</button>
      </div>
      <div className="ajustes-lista">
        <p>Light Mode</p>
        <p>Logout</p>
      </div>
    </div>
  );
}
