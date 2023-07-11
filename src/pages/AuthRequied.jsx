import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../scripts/firebase";

export default function AuthRequied() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        console.log(user.uid);
      } else {
        setIsLogged(false);
        navigate("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLogged)
    return (
      <p style={{ width: "412px", margin: "2rem auto" }}>
        Checking user status...
      </p>
    );
  // !isLogged && <p>Checking user status...</p>;
  return <Outlet />;
}
