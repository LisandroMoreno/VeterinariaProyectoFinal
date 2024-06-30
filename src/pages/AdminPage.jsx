import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { titlePage } from "../helpers/titlePages";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AdminPage = () => {
  titlePage("AdminPage");
  const navigate = useNavigate();

  const cardsAdmin = [
    {
      title: "Pacientes",
      path: "/adminPacientes",
    },
    {
      title: "Profesionales",
      path: "/profesionalesAdmin",
    },
    {
      title: "Turnos",
      path: "/AdminTurnos",
    },
    {
      title: "Productos",
      path: "/productos",
    },
    {
      title: "Usuarios",
      path: "/usuarios",
    },
    {
      title: "Comentarios Pendientes",
      path: "/comentariosPendientes",
    },
  ];

  return (
    <>
      <h2 className="mt-4 text-center">Panel de administracion</h2>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-75"
      >
        <Row className="justify-content-center text-center w-100 mt-5 mx-0">
          {cardsAdmin.map((card, index) => (
            <Col xs="12" sm="6" md="4" lg="3" className="my-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Button variant="dark" onClick={() => navigate(card.path)}>
                    Administrar {card.title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
