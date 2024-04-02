import { Link } from "react-router-dom";
import Logo from "../assets/RZA_LOGO.png";
import { LogoFacebook, LogoInstagram, LogoX } from "@carbon/icons-react";

function AboutUs() {
  return (
    <>
      <div className="Aboutus">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-md-4">
              <br></br>
              <br></br>
              <img src={Logo} alt="RZA Logo" width="300px" />
            </div>
            <div className="col-md-4">
              <h2>Contact Us</h2>
              <br></br>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                <Link to="{LOGIN}" className="nav-link">
                  Email Us:
                </Link>
              </p>
              <p>Phone: 07894623232</p>
              {/* Social Media Icons */}
              <div>
                <a href="#your-facebook-link" rel="noopener noreferrer">
                  <i>
                    <LogoFacebook />
                  </i>
                </a>
                <a href="#your-twitter-link" rel="noopener noreferrer">
                  <i>
                    <LogoX />
                  </i>
                </a>
                <a href="#your-instagram-link" rel="noopener noreferrer">
                  <i>
                    <LogoInstagram />
                  </i>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <h2>Explore Our Services</h2>
              <br></br>
              <p>
                <Link to="{PREORDER}" className="nav-link">
                  Educational Materials
                </Link>
                <br />
                <Link to="{HAMPERORDER}" className="nav-link">
                  Facilities
                </Link>
                <br />
                <Link to="{BOOKINGSPACES}" className="nav-link">
                  Attractions
                </Link>
                <br />
                <Link to="{LESSONS}" className="nav-link">
                  Book Tickets
                </Link>
                <br />
                <Link to="{LOGIN}" className="nav-link">
                  Book A stay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;