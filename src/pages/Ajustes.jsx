/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";

export default function Ajustes() {
  console.log(window.location.pathname);
  const navigate = useNavigate();

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="ajustes-container">
      <button>Light Mode</button>
      <button onClick={handleLogOut} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
