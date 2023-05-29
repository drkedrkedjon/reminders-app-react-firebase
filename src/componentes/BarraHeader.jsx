import { Link } from "react-router-dom";

export default function BarraHeader() {
  return (
    <header className="header-container">
      <Link to={"/edit-lists"}>Edit Lists</Link>
      <Link to={"/settings"}>Settings</Link>
    </header>
  );
}
