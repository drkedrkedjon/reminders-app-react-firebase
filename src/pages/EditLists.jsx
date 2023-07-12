/* eslint-disable react/prop-types */
import EditListInput from "../componentes/EditListInput";
import { ref, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";
import { useContext } from "react";
import { MyListsContext } from "../scripts/DataContexts";
import { MyUserUIDContext } from "../scripts/DataContexts";

export default function EditLists() {
  const lists = useContext(MyListsContext);
  const { userUID } = useContext(MyUserUIDContext);

  function handleNewName(id, newName) {
    const updates = {};
    updates[`/listas/${id}/name`] = newName;
    // updates[`/listas/${userUID}/${id}/name`] = newName;
    return update(ref(db), updates);
  }

  function deleteList(id) {
    // remove(ref(db, `/listas/${userUID}/${id}`));
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
