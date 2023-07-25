/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LogOut } from "react-feather";
import { MyColorUIContext } from "../scripts/DataContexts";

export default function Ajustes() {
  const [errorMsg, setErrorMsg] = useState("");
  const { colorUI, setColorUI } = useContext(MyColorUIContext);
  const navigate = useNavigate();

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }

  function handleColorUI() {
    if (colorUI === "dark") {
      setColorUI("light");
    } else {
      setColorUI("dark");
    }
  }

  return (
    <div className="ajustes-container">
      <button onClick={handleColorUI}>
        {colorUI === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
      <button onClick={handleLogOut} className="logout-btn">
        <span className="logout-span">
          Logout <LogOut size={16} />
        </span>
      </button>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}
