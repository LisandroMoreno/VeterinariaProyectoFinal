const ImageC = ({ urlImagen, alternativo, ancho }) => {
  return (
    <>
      <img src={urlImagen} alt={alternativo} width={ancho} />
    </>
  );
};

export default ImageC;
