import MainC from "../components/MainC";
import { tittlePage } from "../helpers/titlePages";

const HomePage = () => {
  tittlePage("Pagina Principal");
  return (
    <>
      <MainC />
    </>
  );
};

export default HomePage;
