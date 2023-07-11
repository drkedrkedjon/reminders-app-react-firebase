/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Ajustes() {
  console.log(window.location.pathname);
  const [errorMsg, setErrorMsg] = useState("");
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

  return (
    <div className="ajustes-container">
      <button>Light Mode</button>
      <button onClick={handleLogOut} className="logout-btn">
        Logout
      </button>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}
