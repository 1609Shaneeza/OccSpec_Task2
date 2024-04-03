import { Link } from "react-router-dom";
import Logo from "../assets/RZA_LOGO.png";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { HOME, LOGIN, SIGNUP } from "../Constants/Constants";

function Navbar() {
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
              <Link to="" className="navbar-brand">
                Educational Materials
              </Link>
              <Link to="" className="navbar-brand">
                Book Tickets
              </Link>
              <Link to={SIGNUP} className="navbar-brand">
                Signup
              </Link>
              <Link to={LOGIN} className="navbar-brand">
                Login
              </Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;