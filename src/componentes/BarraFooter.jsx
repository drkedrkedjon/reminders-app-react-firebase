import { Link } from "react-router-dom";
import { listsEnDB } from "../scripts/firebase";
import { push } from "firebase/database";

export default function BarraFooter() {
  function handleNewList() {
    push(listsEnDB, {
      name: "New List",
      userID: "",
    });
  }

  return (
    <footer className="footer-container">
      <Link onClick={handleNewList} to="/edit-lists">
        New List
      </Link>
      <Link to="/new-reminder">+ New Reminder</Link>
    </footer>
  );
}
