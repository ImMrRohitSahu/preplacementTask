import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../components/Login/Login";
import Products from "../components/Products/Products";

const Home = () => {
  const { loginPage, isAuth } = useContext(AuthContext);
  return (
    <Container>
      {!loginPage && (
        <Row>
          <Col className="text-center mt-4">
            <h3>Home Page</h3>
          </Col>
        </Row>
      )}
      {loginPage && <Login />}
      {isAuth && <Products/>}
    </Container>
  );
};

export default Home;
