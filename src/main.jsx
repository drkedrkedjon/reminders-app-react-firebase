import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserUID } from "./scripts/DataContexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserUID>
      <App />
    </UserUID>
  </React.StrictMode>
);
