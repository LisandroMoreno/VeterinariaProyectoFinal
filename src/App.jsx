import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RoutesViews from "./routes/RoutesViews";

const App = () => {
  return (
    <>
      <Router>
        <RoutesViews />
      </Router>
    </>
  );
};

export default App;
