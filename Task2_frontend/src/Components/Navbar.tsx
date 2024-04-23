import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/RZA_LOGO.png";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import {
  CHECKOUT,
  DASHBOARD,
  EDUCATION,
  HOME,
  LOGIN,
  ROOMDISPLAY,
  SIGNUP,
  TICKETS,
  TICKETSUMMARY,
} from "../Constants/Constants";
import { AccountCredentialsContext } from "./CredentialsProvider";
import { useContext, useEffect, useState } from "react";
import { UserAvatarFilledAlt } from "@carbon/icons-react";

function Navbar() {
  const credentialsContext = useContext(AccountCredentialsContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!credentialsContext?.accountDetails
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Before logout - credentialsContext:", credentialsContext);
    credentialsContext?.setAccountDetails({ Email: "", Password: "" });
    setIsLoggedIn(false);
    navigate(LOGIN);
    setTimeout(() => {
      console.log("After logout - credentialsContext:", credentialsContext);
      setIsLoggedIn(false);
    }, 0);
  };

  useEffect(() => {
    setIsLoggedIn(!!credentialsContext?.accountDetails);
  }, [credentialsContext?.accountDetails]);

  return (
    <>
      <BootstrapNavbar expand="lg" bg="light" className="Navbar">
        <div className="container">
          <Link to={HOME} className="navbar-brand">
            <img src={Logo} alt="RZA Logo" width="100px" />
          </Link>

          <BootstrapNavbar.Toggle aria-controls="navbarText" />
          <BootstrapNavbar.Collapse id="navbarText">
            <Nav className="me-auto">
              <Link to={HOME} className="navbar-brand">
                HOME
              </Link>
              <Link to={EDUCATION} className="navbar-brand">
                Educational Materials
              </Link>
              <Link to={TICKETS} className="navbar-brand">
                Book Tickets
              </Link>
              <Link to={ROOMDISPLAY} className="navbar-brand">
                TicketSummary
              </Link>
            </Nav>
            <Nav>
              <Link to={SIGNUP} className="navbar-brand">
                Signup
              </Link>
            </Nav>
            {/* <Nav>
            <Link to={ADDINGSTAFF} className="nav-link">
              Add new Staff
            </Link>
          </Nav> */}
            <Nav>
              <div className="d-flex align-items-center">
                {isLoggedIn ? (
                  // If user is logged in, show logout option
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  // If user is not logged in, show login option
                  <Link to={LOGIN} className="btn btn-link nav-link">
                    Login
                  </Link>
                )}
                <Link to="" className="user">
                  <UserAvatarFilledAlt size="32" color="black"/>
                </Link>
              </div>
            </Nav>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
