/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { MyUserUIDContext } from "../scripts/DataContexts";

export default function AuthRequied() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const { setUserUID } = useContext(MyUserUIDContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setUserUID(user.uid);
      } else {
        setIsLogged(false);
        navigate("/login");
      }
    });
  }, []);

  if (!isLogged)
    return (
      <p style={{ width: "412px", margin: "2rem auto" }}>
        Checking user status...
      </p>
    );
  return <Outlet />;
}
