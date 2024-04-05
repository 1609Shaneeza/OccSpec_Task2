import Room1 from "../assets/Room1.png";
import Cafe from "../assets/Cafe.png";
import Animal1 from "../assets/Animal.png";
import Animal2 from "../assets/Animal2.png";
import animal3 from "../assets/animal3.png";
import animal from "../assets/animal5.png";

function Dashboard() {
  return (
    <>
      <h1>Welcome to the Staff Dashboard</h1>
      <br></br>
      <br></br>
      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={animal} style={{ width: "100%" }} />
          </a>
          <div className="desc">View Ticket Bookings</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={Room1} style={{ width: "100%" }} />
          </a>
          <div className="desc">View Room Bookings</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={animal3} style={{ width: "100%" }} />
          </a>
          <div className="desc">View Zoo Bookings</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={Animal1} style={{ width: "100%" }} />
          </a>
          <div className="desc">View Staff Details</div>
        </div>
      </div>

      <div className="clearfix"></div>
      <br></br>
      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={Animal2} style={{ width: "100%" }} />
          </a>
          <div className="desc">Add a Staff Member</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={Cafe} style={{ width: "100%" }} />
          </a>
          <div className="desc">Book a Stay</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={animal} style={{ width: "100%" }} />
          </a>
          <div className="desc">Book Zoo Tickets</div>
        </div>
      </div>

      <div className="responsive">
        <div className="Dashboard">
          <a href="">
            <img src={animal3} style={{ width: "100%" }} />
          </a>
          <div className="desc">Add Educational Materials</div>
        </div>
      </div>

      <div className="clearfix"></div>
    </>
  );
}

export default Dashboard;
