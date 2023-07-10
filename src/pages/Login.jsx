import { useId } from "react";

export default function Login() {
  const id = useId();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input id={`${id}-email`} type="email" placeholder="Your email" />
        <label htmlFor={`${id}-pass`}>Password:</label>
        <input id={`${id}-pass`} type="password" placeholder="Your password" />
        <button>Login</button>
      </form>
    </div>
  );
}
