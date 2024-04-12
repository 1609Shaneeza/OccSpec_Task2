import { useContext, useState } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";
import Zoo from "../assets/SafariZoo.png";
import { MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function TicketSummary() {
  const Tickets = useContext(TicketBookingContext);

  const navigate = useNavigate();

  const numberOfChildren = Tickets?.TicketBooking?.NumOfChildren || 0;
  const NumberOfAdults = Tickets?.TicketBooking?.NumOfAdult || 0;



  return (
    <>
      <div class="bg-image"></div>

      <div class="bg-text">
        <h1>I am John Doe</h1>
        <p>And I'm a Photographer</p>
      </div>
    </>
  );
}

export default TicketSummary;
