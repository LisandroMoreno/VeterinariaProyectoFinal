import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import DetalleProducto from "../pages/DetalleProducto";
import Error404 from "../pages/Error404";
import PlanesPage from "../pages/PlanesPage";
import Contacto from "../pages/Contacto";
import DetalleCarrito from "../pages/DetalleCarrito";
import AdminPage from "../pages/AdminPage";

/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/planes" element={<PlanesPage />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/detalleCarrito" element={<DetalleCarrito />} />
        <Route path="/home-adminLog" element={<AdminPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
