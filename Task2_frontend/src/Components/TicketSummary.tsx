import { useContext } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";
import Logo from "../assets/RZA_LOGO.png";
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function TicketSummary() {
  const Tickets = useContext(TicketBookingContext);

  const navigate = useNavigate();

  const numberOfChildren = Tickets?.TicketBooking?.NumOfChildren || 0;
  const NumberOfAdults = Tickets?.TicketBooking?.NumOfAdult || 0;



  return (
    <>
      <br />
      <h1>Ticket Booking Summary</h1>
      <p className="summaryhead">Please Confirm Your Booking</p>
      <MDBContainer fluid className="my-5">
        <MDBRow className="g-0 align-items-center">
          <MDBCol className="Picture" col="8">
            <img
              src={Logo}
              className="w-100 rounded-4 shadow-4"
              alt=""
              style={{ width: "auto" }}
            />
          </MDBCol>

          <MDBCol col="6">
            <MDBCard
              className="my-6 cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <MDBCardBody className="Summary">
                <MDBRow>
                  <p className="summaryhead">Details</p>
                  <p className="summaryText">
                    Email: {Tickets?.TicketBooking?.Email}
                  </p>
                  <p className="summaryText">
                    Date: {Tickets?.TicketBooking?.date}
                  </p>
                  <p className="summaryText">
                    Educational Visit: {Tickets?.TicketBooking?.EdVisit}
                  </p>
                  <p className="summaryText">
                    Number of Adults: {Tickets?.TicketBooking?.NumOfAdult}
                  </p>
                  <p className="summaryText">
                    Number of Children: {Tickets?.TicketBooking?.NumOfChildren}
                  </p>
                  <p className="summaryText">
                    Total number of people: {numberOfChildren + NumberOfAdults}
                  </p>
                  <br />

                  <p className="summaryhead">Price</p>
                  <p className="summaryText">
                    Subtotal for child ticket: {numberOfChildren * 10}
                  </p>
                  <p className="summaryText">
                    Subtotal for Adult ticket: {NumberOfAdults * 20}
                  </p>
                  <p className="summaryText">
                    Subtotal: {numberOfChildren * 10 + NumberOfAdults * 20}
                  </p>
                </MDBRow>

                <button className="summary" type="submit">
                  Confirm Booking
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <br></br>
    </>
  );
}

export default TicketSummary;
