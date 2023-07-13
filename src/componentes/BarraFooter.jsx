import { Link } from "react-router-dom";
import { push } from "firebase/database";
import { MyUserUIDContext } from "../scripts/DataContexts";
import { useContext } from "react";
import { ref as refDB } from "firebase/database";
import { db } from "../scripts/firebase";

export default function BarraFooter() {
  const { userUID } = useContext(MyUserUIDContext);

  function handleNewList() {
    push(refDB(db, `/listas/${userUID}`), {
      name: "",
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
