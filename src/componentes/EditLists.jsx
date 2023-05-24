/* eslint-disable react/prop-types */
import ListsImput from "./ListsImput";

export default function EditLists({ handleVisibility }) {
  return (
    <div className="lists-container">
      <div className="list-container--barra">
        <button onClick={() => handleVisibility("listas")}>Return</button>
      </div>
      <div className="mis-listas">
        <h2 className="list-title ">My Lists</h2>

        <ListsImput />
        <ListsImput />
        <ListsImput />
        <ListsImput />
      </div>
    </div>
  );
}
