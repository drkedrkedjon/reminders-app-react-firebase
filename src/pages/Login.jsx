import { useId, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const id = useId();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        navigate("/");
        setForm({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input
          value={form.email}
          id={`${id}-email`}
          type="email"
          placeholder="Your email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
        <label htmlFor={`${id}-pass`}>Password:</label>
        <input
          value={form.password}
          id={`${id}-pass`}
          type="password"
          placeholder="Your password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
        <button>Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
