import { Link } from "react-router-dom";
import { Home, Settings, List } from "react-feather";
import { HomeDisplayTypeContext } from "../scripts/DataContexts";
import { useContext } from "react";

export default function BarraHeader() {
  const { setHomeType } = useContext(HomeDisplayTypeContext);

  return (
    <header className="header-container">
      <Link to={"/edit-lists"}>
        <List size={18} />
      </Link>
      <Link onClick={() => setHomeType("lists")} to={"/"}>
        <Home size={22} />
      </Link>
      <Link to={"/settings"}>
        <Settings size={18} />
      </Link>
    </header>
  );
}
