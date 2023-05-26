export default function Home() {
  return (
    <main className="home-container">
      <div className="tablero">
        <div className="tablero-card">
          <div className="tablero-card--firstrow">
            <img
              className="tablero-card--img"
              src="/assets/reloj.png"
              alt="Irelevant Icon"
            />
            <p className="tablero-card--num">5</p>
          </div>
          <p className="tablero-card--date">Hoy: 24/12/2023</p>
        </div>
      </div>
      <section className="home-list-container"></section>
    </main>
  );
}
