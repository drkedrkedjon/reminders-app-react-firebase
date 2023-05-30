/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function EditListInput({ lista, handleNewName, deleteList }) {
  const id = lista[0];
  const oldName = lista[1].name;
  const numItems = lista[1].items ? Object.keys(lista[1].items).length : 0;

  const [listName, setListName] = useState(oldName);
  const [isDeletingList, setIsDeletingList] = useState(false);

  function handleListName(e) {
    setListName(e.target.value);
  }

  // Handle cambio de nombre
  useEffect(() => {
    if (oldName === listName) {
      return;
    }
    const timeout = setTimeout(() => {
      handleNewName(id, listName);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [listName]);

  //  Handle aplazar o deley delete
  useEffect(() => {
    if (!isDeletingList) {
      return;
    }
    const cancelTimeout = setTimeout(() => deleteList(id), 3000);
    return () => clearTimeout(cancelTimeout);
  }, [isDeletingList]);

  const btnRedCancel = isDeletingList ? "cancel-" : "";

  return (
    <div className="list-form-component">
      <button
        onClick={() => setIsDeletingList(!isDeletingList)}
        className={`${btnRedCancel}delete-btn`}
      ></button>
      <input type="text" onChange={handleListName} value={listName} />
      <p className="list-form--num-items">{numItems}</p>
    </div>
  );
}
