/* eslint-disable react/prop-types */
export default function Ajustes() {
  console.log(window.location.pathname);

  return (
    <div className="ajustes-container">
      <button>Light Mode</button>
      <button className="logout-btn">Logout</button>
    </div>
  );
}
