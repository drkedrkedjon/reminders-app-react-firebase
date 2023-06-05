/* eslint-disable react/prop-types */
import EditListInput from "../componentes/EditListInput";
import { onValue, ref, remove, update } from "firebase/database";
import { db, listsEnDB } from "../scripts/firebase";
import { useEffect, useState } from "react";

export default function EditLists() {
  // console.log(window.location.pathname);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(listsEnDB, function (snapshot) {
      if (snapshot.val()) {
        setLists(Object.entries(snapshot.val()));
      } else {
        setLists([]);
      }
    });

    return cancelOnValue;
  }, []);

  function handleNewName(id, newName) {
    const updates = {};
    updates[`/listas/${id}`] = { name: newName };
    return update(ref(db), updates);
  }

  function deleteList(id) {
    remove(ref(db, `/listas/${id}`));
  }

  const mapeo = lists.map((lista) => {
    return (
      <EditListInput
        key={lista[0]}
        lista={lista}
        handleNewName={handleNewName}
        deleteList={deleteList}
      />
    );
  });

  return (
    <div className="edit-lists-container">
      <h2 className="list-title">Delete list or edit list name</h2>
      <div className="edit-lists-input-container">{mapeo}</div>
    </div>
  );
}
