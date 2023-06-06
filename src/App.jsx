import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import EditLists from "./pages/EditLists";
import Ajustes from "./pages/Ajustes";
import NewReminders from "./pages/NewReminders";
import ListDetails from "./pages/ListDetails";
import ReminderDetails from "./pages/ReminderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="edit-lists" element={<EditLists />} />
          <Route path="settings" element={<Ajustes />} />
          <Route path="new-reminder" element={<NewReminders />} />
          <Route path="list/:id" element={<ListDetails />} />
          <Route path="reminder/:id" element={<ReminderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
