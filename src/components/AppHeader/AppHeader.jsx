import { useContext, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import SignUpModal from "../SignUpModal/SignUpModal";
import { AuthContext } from "../../contexts/AuthContext";
import Headroom from "react-headroom";
import route from "./../../routes/route.json";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";

const AppHeader = () => {
  const { isAuth, authLogoutHandler, setLoginPage, userName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleClick = () => {
    setShowSignUpModal(true);
    setLoginPage(false);
  };

  const logoutHandler = () => {
    navigate(route.HOME);
    authLogoutHandler();
  };
  return (
    <>
      <Container fluid className="m-0 p-0">
        <Headroom className="w-100">
          <Navbar
            bg="dark"
            variant="dark"
            className="d-flex justify-content-between align-items-center px-1 px-md-2"
          >
            <Navbar.Brand href="#home">Pre-Placement</Navbar.Brand>
            <div>
              {isAuth ? (
                <div className="d-flex align-items-center">
                  <h6 className="text-light username mt-2 me-3 mb-0 p-0">
                    {userName}
                  </h6>
                  <NavLink to={`/${route.CART}`} className="link">
                    <BsCartCheckFill className="fs-4 me-3" />
                  </NavLink>
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
