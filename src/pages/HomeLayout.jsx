import { Outlet } from "react-router-dom";
import BarraHeader from "../componentes/BarraHeader";
import BarraFooter from "../componentes/BarraFooter";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <BarraHeader />
      <Outlet />
      <BarraFooter />
    </main>
  );
}
