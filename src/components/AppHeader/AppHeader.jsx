import { useContext, useState } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import SignUpModal from "../SignUpModal/SignUpModal";
import { AuthContext } from "../../contexts/AuthContext";
import Headroom from "react-headroom";

const AppHeader = () => {
  const { isAuth, authLogoutHandler, setLoginPage, userName } =
    useContext(AuthContext);

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleClick = () => {
    setShowSignUpModal(true);
    setLoginPage(false);
  };

  const logoutHandler = () => {
    authLogoutHandler();
  };
  return (
    <>
      <Container fluid>
          <Headroom>
        <Row>
            <Col xs={12} className="p-0">
              <Navbar
                bg="dark"
                variant="dark"
                className="d-flex justify-content-between px-3"
              >
                <Navbar.Brand href="#home">Pre-Placement</Navbar.Brand>
                <div>
                  {isAuth ? (
                    <div className="d-flex">
                      <h6 className="text-light mt-2 me-3">{userName}</h6>
                      <Button variant="outline-danger" onClick={logoutHandler}>
                        Logout
                      </Button>{" "}
                    </div>
                  ) : (
                    <>
                      <Button variant="outline-info" onClick={handleClick}>
                        Sign Up
                      </Button>{" "}
                      <Button
                        variant="outline-primary"
                        onClick={() => setLoginPage(true)}
                      >
                        Login
                      </Button>{" "}
                    </>
                  )}
                </div>
              </Navbar>
            </Col>
        </Row>
          </Headroom>
      </Container>
      <SignUpModal
        setShowSignUpModal={setShowSignUpModal}
        showSignUpModal={showSignUpModal}
      />
    </>
  );
};

export default AppHeader;
