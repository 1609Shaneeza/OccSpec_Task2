import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/RZA_LOGO.png";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import {
  CHECKOUT,
  DASHBOARD,
  EDUCATION,
  HOME,
  LOGIN,
  SIGNUP,
} from "../Constants/Constants";
import { AccountCredentialsContext } from "./CredentialsProvider";
import { useContext, useEffect, useState } from "react";

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
      <BootstrapNavbar expand="lg" className="Navbar">
        <div className="container">
          <Link to={HOME} className="navbar-brand">
            <img src={Logo} alt="RZA Logo" width="100px" />
          </Link>
          <BootstrapNavbar.Toggle aria-controls="navbarText" />
          <BootstrapNavbar.Collapse id="navbarText">
            <Nav className="me-auto">
              <br></br>
              <Link to={HOME} className="navbar-brand">
                HOME
              </Link>
              <Link to={EDUCATION} className="navbar-brand">
                Educational Materials
              </Link>
              <Link to="" className="navbar-brand">
                Book Tickets
              </Link>
              <Link to={SIGNUP} className="navbar-brand">
                Signup
              </Link>
              <Link to={CHECKOUT} className="navbar-brand">
                Checkout
              </Link>
              <nav>
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
                </div>
              </nav>
            </Nav>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
