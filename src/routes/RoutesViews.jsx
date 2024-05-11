import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";

/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
