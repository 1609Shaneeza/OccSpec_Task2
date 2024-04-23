import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { ATTRACTIONS, AVAILABILITY, TICKETS } from "../Constants/Constants";
import SafariZoo from "../assets/SafariZoo.png";
import Room from "../assets/Room1.png";
import Animal2 from "../assets/Animal2.png";

function Corousel() {
  return (
    <>
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem>
          <img src={SafariZoo} className="d-block w-100 h-100" />
          <MDBCarouselCaption>
            <h5>Safari Style Zoo</h5>
            <Link to={ATTRACTIONS}>
              <p>
                Look at all the attractions available at Riget Zoo Adventures
              </p>
            </Link>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <img
            src={Room}
            className="d-block w-100"
          />

          <MDBCarouselCaption>
            <h5>An on-site Hotel</h5>
            <Link to={AVAILABILITY}>
              <p>Book a Stay at our on-site hotel</p>
            </Link>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <img
            src={Animal2}
            className="d-block w-100"
          />
          <MDBCarouselCaption>
            <h5>Book Tickets Online</h5>
            <Link to={TICKETS}>
              <p>You can now book tickets for the Zoo Online</p>
            </Link>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
}

export default Corousel;
