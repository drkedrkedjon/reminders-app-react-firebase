import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import EditLists from "./pages/EditLists";
import Ajustes from "./pages/Ajustes";
import NewReminders from "./pages/NewReminders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="edit-lists" element={<EditLists />} />
          <Route path="settings" element={<Ajustes />} />
          <Route path="new-reminder" element={<NewReminders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
