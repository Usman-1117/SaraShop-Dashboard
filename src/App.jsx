import { BrowserRouter, Route, Routes } from "react-router-dom";
// Auth
import Login from "./pages/Auth/Login";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Resetpassword from "./pages/Auth/Resetpassword";
// Components
import MainLayout from "./components/MainLayout/MainLayout";
// Pages
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          {/* Pages */}

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
