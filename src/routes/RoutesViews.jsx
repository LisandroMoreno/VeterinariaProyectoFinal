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
import DetalleFavorito from "../pages/DetalleFavorito";
import AdminProductsPage from "../pages/AdminProductPage";
import ProfesionalesPage from "../pages/ProfesionalesPage";
import AdminUsersPage from "../pages/AdminUsersPage";

/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/planes" element={<PlanesPage />} />
        <Route path="/reservaTurnos" element={<ProfesionalesPage />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/detalleCarrito" element={<DetalleCarrito />} />
        <Route path="/detalleFavorito" element={<DetalleFavorito />} />
        <Route path="/home-adminLog" element={<AdminPage />} />
        <Route path="/productos" element={<AdminProductsPage />} />
        <Route path="/usuarios" element={<AdminUsersPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
