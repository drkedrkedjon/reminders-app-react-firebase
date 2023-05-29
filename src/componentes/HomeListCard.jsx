/* eslint-disable react/prop-types */
export default function HomeListCard({ lista }) {
  const numItems = lista[1].items ? Object.keys(lista[1].items).length : 0;

  return (
    <div className="home-list-component">
      <h3>{lista[1]?.name}</h3>
      <p className="home-list-component--num">{numItems}</p>
      <img src="/assets/bandera.png" alt="Flag" />
    </div>
  );
}
