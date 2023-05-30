import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function EditListInput({ lista, handleNewName, deleteList }) {
  const id = lista[0];
  const oldName = lista[1].name;
  const numItems = lista[1].items ? Object.keys(lista[1].items).length : 0;

  const [listName, setListName] = useState(oldName);

  function handleListName(e) {
    setListName(e.target.value);
  }

  useEffect(() => {
    if (oldName === listName) {
      return;
    }
    const timeout = setTimeout(() => {
      handleNewName(id, listName);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [listName]);

  return (
    <div className="list-form-component">
      <button
        onClick={() => deleteList(id)}
        className="cancel-delete-btn"
      ></button>
      <input type="text" onChange={handleListName} value={listName} />
      <p className="list-form--num-items">{numItems}</p>
    </div>
  );
}
