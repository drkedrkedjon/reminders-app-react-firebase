import { Outlet } from "react-router-dom";
import BarraHeader from "../componentes/BarraHeader";
import BarraFooter from "../componentes/BarraFooter";
import {
  ListsContext,
  RemindersContext,
  MyHomeDisplayTypeContext,
  MyColorUI,
} from "../scripts/DataContexts";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <ListsContext>
        <RemindersContext>
          <MyHomeDisplayTypeContext>
            <MyColorUI>
              <BarraHeader />
              <Outlet />
              <BarraFooter />
            </MyColorUI>
          </MyHomeDisplayTypeContext>
        </RemindersContext>
      </ListsContext>
    </main>
  );
}
