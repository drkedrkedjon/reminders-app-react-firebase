import HomeListCard from "../componentes/HomeListCard";
import TableroCard from "../componentes/TableroCard";
export default function Home() {
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
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
      </section>
    </main>
  );
}
