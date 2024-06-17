import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
<<<<<<< HEAD
import NavbarC from "./components/NavbarC";
import FooterC from "./components/FooterC";
=======
>>>>>>> 809ce58f8e507e63609d3a6d606d9ab4d9e9051e
import "./App.css";

const App = () => {
  return (
    <>
      <NavbarC />
      <Router>
        <RoutesViews />
      </Router>
      <FooterC />
    </>
  );
};

export default App;
