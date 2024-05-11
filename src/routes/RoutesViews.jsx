import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
/* Todas las rutas del proyecto - Path / element  */

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
