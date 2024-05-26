import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import DetalleProducto from "../pages/DetalleProducto";

/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
