import HomeListCard from "../componentes/HomeListCard";
import TableroCard from "../componentes/TableroCard";
import { useContext } from "react";
import { MyListsContext } from "../scripts/DataContexts";
import { Flag, BookOpen, Watch, Calendar } from "react-feather";

export default function Home() {
  const lists = useContext(MyListsContext);

  const mapeo = lists.map((lista) => {
    return <HomeListCard key={lista[0]} lista={lista} />;
  });

  return (
    <main className="home-container">
      <section className="tablero">
        <TableroCard
          imagen={<BookOpen color="var(--color-green)" />}
          num="28"
          text="All Reminders"
          date={false}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Flag color="var(--color-red)" />}
          num="7"
          text="Flaged"
          date={false}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Watch color="var(--color-orange)" />}
          num="3"
          text=""
          date={true}
          color="var(--color)"
        />
        <TableroCard
          imagen={<Calendar color="var(--color-acentado)" />}
          num="14"
          text="Next 3 days"
          date={false}
          color="var(--color)"
        />
      </section>

      <section className="home-list-container">
        <h2 className="list-title">My Lists</h2>
        {mapeo}
      </section>
    </main>
  );
}
