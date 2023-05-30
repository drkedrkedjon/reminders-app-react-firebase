import HomeListCard from "../componentes/HomeListCard";
import TableroCard from "../componentes/TableroCard";
import { onValue } from "firebase/database";
import { listasEnDB } from "../scripts/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  // console.log(window.location.pathname);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(listasEnDB, function (snapshot) {
      if (snapshot.val()) {
        setLists(Object.entries(snapshot.val()));
      } else {
        setLists([]);
      }
    });
    return cancelOnValue;
  }, []);

  const mapeo = lists.map((lista) => {
    return <HomeListCard key={lista[0]} lista={lista} />;
  });

  return (
    <main className="home-container">
      <div className="tablero">
        <TableroCard
          src="/assets/reloj.png"
          alt="Clock"
          num="3"
          text="Sasa"
          date={true}
          color="var(--color-red)"
        />
        <TableroCard
          src="/assets/bandera.png"
          alt="Flag"
          num="7"
          text="Flaged"
          date={false}
          color="var(--color)"
        />
        <TableroCard
          src="/assets/easy.png"
          alt="Woman working on laptop"
          num="14"
          text="Next 3 days"
          date={false}
          color="var(--color-orange)"
        />
        <TableroCard
          src="/assets/relax.png"
          alt="Person on sunbed"
          num="28"
          text="Next 7 days"
          date={false}
          color="var(--color-green)"
        />
      </div>

      <section className="home-list-container">
        <h2 className="list-title">My Lists</h2>
        {mapeo}
      </section>
    </main>
  );
}
