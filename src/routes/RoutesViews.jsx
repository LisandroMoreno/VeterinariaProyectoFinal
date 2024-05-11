import { Routes, Route } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import RegisterPage from "../pages/RegisterPage";

/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
