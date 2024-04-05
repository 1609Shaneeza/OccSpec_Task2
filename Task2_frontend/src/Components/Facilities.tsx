import Cafe from "../assets/Cafe.png";
import Accessibility from "../assets/Accessibility.png";
import CarPark from "../assets/Carpark.png";
import Room from "../assets/Room1.png";
import Safari from "../assets/SafariZoo.png";
import Lake from "../assets/Lake.png";
import PlayArea from "../assets/PlayArea.png";
import restaurant from "../assets/Restaurant.png";
import { useEffect } from "react";

function Facilities() {
    useEffect(() => {
      document.title = "Facilities";
    });
  return (
    <>
      <br></br>
      <h1>Explore Our Facilities at Riget Zoo Adventures</h1>
      <br></br>
      <br></br>
      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={Cafe} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Our Cafe at RZA</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={Safari} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Our Safar-Style Zoo</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={PlayArea} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Play Area for Children</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={Room} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Our on-site Hotel</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="clearfix"></div>
      <br></br>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={Lake} width="270" height="200" />
          </a>
          <div className="desc">
            <h5>Lake At RZA</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={Accessibility} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Accessibility</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={CarPark} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Car Park At RZA</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="responsive">
        <div className="gallery">
          <a>
            <img src={restaurant} width="270" height="200" />
          </a>
          <div className="desc">
            <h4>Restaurant at RZA</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <br></br>
    </>
  );
}

export default Facilities;