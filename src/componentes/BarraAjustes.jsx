import EditLists from "./EditLists";
import Ajustes from "./Ajustes";
import { useState } from "react";

export default function BarraAjustes() {
  const [ajustesVisibility, setAjustesVisibility] = useState(false);
  const [editListVisibility, setEditListVisibility] = useState(false);

  function handleVisibility(whatButton) {}

  return (
    <div className="barra-ajustes-container">
      <button onClick={() => handleVisibility("listas")}>Edit Lists</button>
      <button onClick={() => handleVisibility("ajustes")}>Settings</button>
      {editListVisibility && <EditLists />}
      {ajustesVisibility && <Ajustes />}
    </div>
  );
}
