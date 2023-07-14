import { Link } from "react-router-dom";
import { MyRemindersContext } from "../scripts/DataContexts";
import { useContext } from "react";

/* eslint-disable react/prop-types */
export default function HomeListCard({ lista }) {
  const reminders = useContext(MyRemindersContext);

  const numberOfItems = reminders.filter((reminder) => {
    return reminder[1].listID === lista[0];
  }).length;

  return (
    <Link to={`list/${lista[0]}`}>
      <div className="home-list-component">
        <h3>{lista[1]?.name}</h3>
        <p className="home-list-component--num">{numberOfItems}</p>
        <img
          style={{ height: "30px" }}
          src="/assets/flecha-derecha.svg"
          alt="Arrow"
        />
      </div>
    </Link>
  );
}
