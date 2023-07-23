import { Outlet } from "react-router-dom";
import BarraHeader from "../componentes/BarraHeader";
import BarraFooter from "../componentes/BarraFooter";
import {
  ListsContext,
  RemindersContext,
  MyHomeDisplayTypeContext,
} from "../scripts/DataContexts";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <ListsContext>
        <RemindersContext>
          <MyHomeDisplayTypeContext>
            <BarraHeader />
            <Outlet />
            <BarraFooter />
          </MyHomeDisplayTypeContext>
        </RemindersContext>
      </ListsContext>
    </main>
  );
}
