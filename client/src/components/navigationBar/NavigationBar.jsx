import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navigation.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout } from "../../redux/slices/auth";
import logo from "../../assets/Billfactor.png";
const NavigationBar = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowManagerBoard(currentUser.type.includes("manager"));
      // setShowAdminBoard(currentUser.type.includes("ROLE_ADMIN"));
    } else {
      setShowManagerBoard(false);
      // setShowAdminBoard(false);
    }

    // EventBus.on("logout", () => {
    //   logOut();
    // });

    // return () => {
    //   EventBus.remove("logout");
    // };
  }, [currentUser, logOut]);

  return (
    <>
      <Navbar
        className="sticky-top navbarrr bg-transparent"
        expand="md"
        collapseOnSelect="true"
      >
        <Container>
          <Navbar.Brand>
            <Nav.Link
              eventKey="1"
              as={Link}
              to="/"
              className="text-white link d-flex"
            >
              <img src={logo} alt="logo" height="30px" />
              <b className="text-dark">Bill</b>
              <b className="text-secondary">Factor</b>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-lg-0" navbarScroll>
              <React.Fragment>
                <Nav.Link eventKey="1" as={Link} to="/" className="navLink">
                  {/* <Link > */}
                  Home
                  {/* </Link> */}
                </Nav.Link>
                {showManagerBoard && (
                  <>
                    <Nav.Link
                      eventKey="2"
                      as={Link}
                      to="/mod"
                      className="navLink"
                    >
                      {/* <Link > */}
                      Dashboard
                      {/* </Link> */}
                    </Nav.Link>
                    <Nav.Link
                      eventKey="5"
                      as={Link}
                      to="/profile"
                      className="navLink"
                    >
                      {/* <Link > */}
                      {currentUser.name}
                      {/* </Link> */}
                    </Nav.Link>
                  </>
                )}

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <Nav.Link
                      eventKey="6"
                      as={Link}
                      to="login"
                      className="navLink bg-danger"
                      onClick={logOut}
                    >
                      {/* <Link > */}
                      logout
                      {/* </Link> */}
                    </Nav.Link>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <Nav.Link
                      eventKey="7"
                      as={Link}
                      to="/login"
                      className="navLink"
                    >
                      {/* <Link > */}
                      Login
                      {/* </Link> */}
                    </Nav.Link>
                  </div>
                )}
              </React.Fragment>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
