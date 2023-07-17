import { useId, useState, useRef } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [repeatPasswordForm, setRepeatPasswordForm] = useState("");
  const [repeatPasswordString, setRepeatPasswordString] = useState("");

  const id = useId();
  const btnRef = useRef(null);
  const navigate = useNavigate();

  function handleRepeatPassword(e) {
    const checkPass = e.target.value;

    if (checkPass !== form.password) {
      btnRef.current.disabled = true;
      setRepeatPasswordString("Do not match");
      setBtnDisabled(true);
    } else if (checkPass === form.password) {
      btnRef.current.disabled = false;
      setRepeatPasswordString("Match");
      setBtnDisabled(false);
    }
    setRepeatPasswordForm(checkPass);
  }

  function clearForm() {
    setForm({
      email: "",
      password: "",
    });
    setRepeatPasswordForm("");
    setRepeatPasswordString("");
  }

  function handleRegister() {
    setIsRegistered(!isRegistered);
    clearForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    btnRef.current.disabled = true;

    if (!isRegistered) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          btnRef.current.disabled = false;
          setBtnDisabled(false);
          clearForm();
          setError(error.message);
        });
      return;
    }

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        btnRef.current.disabled = false;
        setBtnDisabled(false);
        clearForm();
        setError(error.message);
      });
  }

  if (form.email && form.password && btnDisabled) setBtnDisabled(false);
  else if ((!form.email || !form.password) && !btnDisabled)
    setBtnDisabled(true);

  return (
    <div className="login-container">
      <h1>{isRegistered ? "Login" : "Create Account"}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input
          required={true}
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
          required={true}
          value={form.password}
          id={`${id}-pass`}
          type="password"
          minLength={8}
          placeholder="Your password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
        {!isRegistered && (
          <>
            <label htmlFor={`${id}-repeat-pass`}>
              Repeat password:{" "}
              {
                <span style={{ color: "var(--color)" }}>
                  {repeatPasswordString}
                </span>
              }
            </label>
            <input
              required={true}
              value={repeatPasswordForm}
              type="password"
              minLength={8}
              id={`${id}-repeat-pass`}
              placeholder="Repeat password"
              onChange={handleRepeatPassword}
            />
          </>
        )}
        <button ref={btnRef} disabled={btnDisabled}>
          {isRegistered ? "Login" : "Create Account"}
        </button>
        <p onClick={handleRegister} className="register-link">
          {isRegistered
            ? "Have no account? Get one!"
            : "Already have an account? Login!"}
        </p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
