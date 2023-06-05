import { Outlet } from "react-router-dom";
import BarraHeader from "../componentes/BarraHeader";
import BarraFooter from "../componentes/BarraFooter";
import { ListsContext, RemindersContext } from "../scripts/DataContexts";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <ListsContext>
        <RemindersContext>
          <BarraHeader />
          <Outlet />
          <BarraFooter />
        </RemindersContext>
      </ListsContext>
    </main>
  );
}
