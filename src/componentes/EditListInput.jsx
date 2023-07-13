/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { MyRemindersContext } from "../scripts/DataContexts";
import { Link } from "react-router-dom";

export default function EditListInput({ lista, handleNewName, deleteList }) {
  const id = lista[0];
  const oldName = lista[1].name;

  const remindersContext = useContext(MyRemindersContext);
  const [listName, setListName] = useState(oldName);
  const [isDeletingList, setIsDeletingList] = useState(false);

  const numItems = remindersContext.filter((reminder) => {
    return reminder[1].listID === id;
  }).length;

  function handleListName(e) {
    setListName(e.target.value);
  }

  // Handle cambio de nombre de la lista
  useEffect(() => {
    if (oldName === listName) {
      return;
    }
    const timeout = setTimeout(() => {
      handleNewName(id, listName);
    }, 500);
    return () => clearTimeout(timeout);
  }, [listName]);

  //  Handle aplazar o deley delete lista
  useEffect(() => {
    if (!isDeletingList) {
      return;
    }
    const cancelTimeout = setTimeout(() => deleteList(id), 2000);
    return () => clearTimeout(cancelTimeout);
  }, [isDeletingList]);

  //  Para poner punto rojo en el botton de borrar la lista
  const btnRedCancel = isDeletingList ? "cancel-" : "";

  return (
    <div className="list-form-component">
      <button
        onClick={() => setIsDeletingList(!isDeletingList)}
        // Aqui uso punto rojo
        className={`${btnRedCancel}delete-btn`}
      ></button>
      <input
        type="text"
        onChange={handleListName}
        value={listName}
        placeholder="Name your list here..."
      />
      <p className="list-form--num-items">{numItems}</p>
      <Link to={`/list/${id}`} className="reminder-card-arrow">
        <img src="/assets/flecha-derecha.png" alt="" />
      </Link>
    </div>
  );
}
