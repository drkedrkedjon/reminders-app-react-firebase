import { Link } from "react-router-dom";
import { listasEnDB } from "../scripts/firebase";
import { push } from "firebase/database";

export default function BarraFooter() {
  function handleNewList() {
    push(listasEnDB, {
      name: "New List",
      items: {},
    });
  }

  return (
    <footer className="footer-container">
      <Link onClick={handleNewList} to="/">
        New List
      </Link>
      <Link to="/new-reminder">+ New Reminder</Link>
    </footer>
  );
}
