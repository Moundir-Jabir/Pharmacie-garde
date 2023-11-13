import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./pages/dashboard";
import Pharmacies from "./pages/pharmacies/pharmacies";
import Login from "./pages/auth/Login";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Resetpassword from "./pages/auth/Resetpassword";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./Utils/ProtectRoute";
import Commentaire from "./pages/commentaire/commentaire";
import DisplayTraceability from "./pages/traceability/displayTraceability";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/*" element={<NotFound />} />
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pharmacie" element={<Pharmacies />} />
            <Route path="/commentaire" element={<Commentaire />} />
            <Route path="/traceability" element={<DisplayTraceability />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
