import { Routes, Route } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import HomePage from "../pages/HomePage";
/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
