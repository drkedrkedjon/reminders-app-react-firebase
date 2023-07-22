import { Link } from "react-router-dom";
import { Home, Settings, List } from "react-feather";

export default function BarraHeader() {
  return (
    <header className="header-container">
      <Link to={"/edit-lists"}>
        <List size={18} />
      </Link>
      <Link to={"/"}>
        <Home size={22} />
      </Link>
      <Link to={"/settings"}>
        <Settings size={18} />
      </Link>
    </header>
  );
}
