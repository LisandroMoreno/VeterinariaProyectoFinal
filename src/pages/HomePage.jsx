import MainC from "../components/MainC";
import { titlePage } from "../helpers/titlePages";

const HomePage = () => {
  titlePage("Pagina Principal");
  return (
    <>
      <MainC />
    </>
  );
};

export default HomePage;
