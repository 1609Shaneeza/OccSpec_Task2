import Lake from "../assets/Lake.png";
import Safari from "../assets/Animal.png";
import Ticket from "../assets/Animal2.png";
import attractions from "../assets/Attractions1.png";
import zoo1 from "../assets/animal3.png";
import zoo2 from "../assets/Facilities.png";
import zoo3 from "../assets/animal5.png";
import zoo4 from "../assets/animal6.png";
import Zoo5 from "../assets/animal7.png";
import { useEffect } from "react";


function Attractions() {
    useEffect(() => {
      document.title = "Attractions";
    });
  return (
    <>
      <br></br>
      <h1>Riget Zoo Adventures</h1>
      <br></br>
      <br></br>
      <div className="container text-center">
        <h3>Attractions at Riget Zoo Adventures</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="row">
        <div className="column">
          <img src={Zoo5} />
          <img src={zoo1} />
          <img src={zoo2} />
          <img src={zoo3} />
        </div>
        <div className="column">
          <img src={zoo4} />
          <img src={attractions} />
          <img src={Lake} />
          <img src={Safari} />
        </div>
        <div className="column">
          <img src={Ticket} />
          <img src={Zoo5} />
          <img src={zoo1} />
          <img src={zoo2} />
        </div>
      </div>
      <br></br>
    </>
  );
}

export default Attractions;