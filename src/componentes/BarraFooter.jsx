import { Link } from "react-router-dom";

export default function BarraFooter() {
  return (
    <footer className="footer-container">
      <Link to="/new-reminder">+ New Reminder</Link>
    </footer>
  );
}
