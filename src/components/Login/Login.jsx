import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

// eslint-disable-next-line react/prop-types,
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const { setLoginPage, authLoginHandler } = useContext(AuthContext);

  useEffect(() => {
    const userDataString = localStorage.getItem("preplaceUser");
    if (userDataString) {
      const parseUserData = JSON.parse(userDataString);
      setData(parseUserData);
      console.log(parseUserData);
    }
  }, []);

  const loginMatchHandler = () => {
    if (!data) {
      setError("No user data found");
      return;
    }

    const user = data.find(
      (item) => item.email === email && item.password === password
    );

    if (user) {
      authLoginHandler(user.name);
      setError("");
      setLoginPage(false)
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={10} md={8}>
          <Card className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-center fs-3 m-3">User Login</h1>
            <div className="d-flex flex-column justify-content-center align-items-center input">
              <input
                type="eamil"
                autoFocus
                placeholder="Enter Your Registered Email..."
                onChange={(e) => setEmail(e.target.value)}
                className="my-3"
              />
              <input
                type="password"
                placeholder="Enter Your Password..."
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
              />
            </div>
            <div className="mb-4">
              <span className="text-danger">{error}</span>
            </div>
            <Button onClick={loginMatchHandler} className="loginbtn mb-4">
              Login Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
