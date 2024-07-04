import { useEffect, useState } from "react";
import { titlePage } from "../helpers/titlePages";
import { Col, Container, Row, Button } from "react-bootstrap";
import clienteAxios, { config } from "../helpers/clienteAxios";
import Swal from "sweetalert2";

const DetalleMisReservas = () => {
  titlePage(`Detalle de Reservas`);

  const [reservas, setReservas] = useState([]);

  const getAllReservas = async () => {
    try {
      const response = await clienteAxios.get(`/turnos`, config);
      setReservas(response.data);
    } catch (error) {
      mostrarError("Error al obtener las reservas", error);
    }
  };

  useEffect(() => {
    getAllReservas();
  }, []);

  const mostrarError = (titulo, error) => {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: "Hubo un problema al obtener la información de tus reservas. Por favor, intenta nuevamente.",
      titulo,
      error,
      footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
    });
  };

  const handleBorrarReserva = async (idReserva) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await clienteAxios.delete(`/turnos/${idReserva}`, config);
        Swal.fire({
          icon: "success",
          title: "Reserva eliminada",
          text: "La reserva ha sido eliminada correctamente.",
        });
        getAllReservas();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar la reserva",
        error,
      });
    }
  };

  return (
    <>
      <div className="mt-3 mx-3">
        <h4>Resumen de tus Reservas</h4>
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center text-center">
          {reservas.map((turno) =>
            turno.reservas.map((reserva) => (
              <Col sm="12" md="6" lg="3" className="my-3" key={reserva._id}>
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <h5>Detalles de la reserva:</h5>
                  <p>
                    <strong>Detalle de la Cita:</strong> {reserva.detalleCita}
                  </p>
                  <p>
                    <strong>Veterinario:</strong> {reserva.veterinario}
                  </p>
                  <p>
                    <strong>Mascota:</strong> {reserva.mascota}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {reserva.fecha.split("T")[0]}
                  </p>
                  <p>
                    <strong>Hora:</strong> {reserva.hora}
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => handleBorrarReserva(reserva._id)}
                  >
                    Borrar Reserva
                  </Button>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default DetalleMisReservas;
