/* eslint-disable react/prop-types */
import EditListInput from "../componentes/EditListInput";

export default function EditLists() {
  return (
    <div className="edit-lists-container">
      <h2 className="list-title">My Lists</h2>
      <div className="edit-lists-input-container">
        <EditListInput />
        <EditListInput />
        <EditListInput />
        <EditListInput />
      </div>
    </div>
  );
}
