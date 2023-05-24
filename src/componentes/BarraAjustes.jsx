import EditLists from "./EditLists";
import Ajustes from "./Ajustes";
import { useState } from "react";

export default function BarraAjustes() {
  const [editListVisibility, setEditListVisibility] = useState(false);
  const [ajustesVisibility, setAjustesVisibility] = useState(false);

  function handleVisibility(whatButton) {
    whatButton === "listas" && setEditListVisibility((oldValue) => !oldValue);
    whatButton === "ajustes" && setAjustesVisibility((oldValue) => !oldValue);
  }

  return (
    <>
      <div className="barra-ajustes-container">
        <button onClick={() => handleVisibility("listas")}>Edit Lists</button>
        <button onClick={() => handleVisibility("ajustes")}>Settings</button>
      </div>
      {editListVisibility && <EditLists handleVisibility={handleVisibility} />}
      {ajustesVisibility && <Ajustes handleVisibility={handleVisibility} />}
    </>
  );
}
