import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { titlePage } from "../helpers/titlePages";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AdminPage = () => {
  titlePage("AdminPage");
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const cardsAdmin = [
    {
      title: "Pacientes",
      path: "/pacientes",
    },
    {
      title: "Turnos",
      path: "/turnos",
    },
    {
      title: "Productos",
      path: "/productos",
    },
    {
      title: "Usuarios",
      path: "/usuarios",
    },
  ];

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-75">
        <Row className="justify-content-center text-center w-100 mt-5 mx-0">
          {cardsAdmin.map((card, index) => (
            <Col xs="12" sm="6" md="4" lg="3" className="my-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
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
