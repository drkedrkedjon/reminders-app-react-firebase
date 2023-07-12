import { Link } from "react-router-dom";
import { listsEnDB } from "../scripts/firebase";
import { push } from "firebase/database";
import { MyUserUIDContext } from "../scripts/DataContexts";
import { useContext } from "react";
// import { ref as listRef } from "firebase/database";
// import { db } from "../scripts/firebase";

export default function BarraFooter() {
  const { userUID } = useContext(MyUserUIDContext);
  console.log(userUID);
  function handleNewList() {
    push(listsEnDB, {
      name: "",
      userID: "",
    });
  }

  // function handleNewList() {
  //   push(listRef(db, `/listas/${userUID}`), {
  //     name: "",
  //     userID: "",
  //   });
  // }

  return (
    <footer className="footer-container">
      <Link onClick={handleNewList} to="/edit-lists">
        New List
      </Link>
      <Link to="/new-reminder">+ New Reminder</Link>
    </footer>
  );
}
