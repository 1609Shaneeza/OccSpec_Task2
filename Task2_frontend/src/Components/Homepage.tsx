import { useEffect } from "react";
import Facilities from "../assets/Facilities.png";
import Ticket from "../assets/Animal2.png";
import Rooms from "../assets/Room1.png";
import attractions from "../assets/Attractions1.png";
import { ATTRACTIONS, FACILITIES } from "../Constants/Constants";

function Homepage() {
  useEffect(() => {
    document.title = "Homepage";
  });

  return (
    <>
      <br></br>
      <h1>Riget Zoo Adventures</h1>
      <br></br>
      <br></br>

      <div className="container text-center col col-lg-auto">
        <div className="home">
          <div className="row">
            <div className="col col-lg-4">
              <br></br>
              <br></br>
              <h2>Welcome To RZA</h2>
              <br></br>
              <p>
                Riget Zoo Adventures (RZA) is a local attraction which offers a
                safari-style wildlife zoo, an on-site hotel and educational
                visits. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div className="col col-lg-4">
              <br></br>
              <div className="Facilities">
                <div className="gallery">
                  <a href={FACILITIES}>
                    <img src={Facilities} style={{ width: "100%" }} />
                  </a>
                  <div className="desc">Facilities At RZA</div>
                </div>
              </div>
              <br></br>
              <div className="Attractions">
                <div className="gallery">
                  <a href={ATTRACTIONS}>
                    <img src={attractions} style={{ width: "100%" }} />
                  </a>
                  <div className="desc">Attractions at RZA</div>
                </div>
              </div>
            </div>
            <div className="col col-lg-4">
              <br></br>
              <div className="Tickets">
                <div className="gallery">
                  <a href="">
                    <img src={Ticket} style={{ width: "100%" }} />
                  </a>
                  <div className="desc">Book Tickets</div>
                </div>
              </div>
              <br></br>
              <div className="Rooms">
                <div className="gallery">
                  <a href="">
                    <img src={Rooms} style={{ width: "100%" }} />
                  </a>
                  <div className="desc">Book a Stay at our hotel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}

export default Homepage;