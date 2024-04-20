import { FormEvent, useContext, useState } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";
import axios from "axios";

function TicketSummary() {
  const [message, setMessage] = useState("");
  const Tickets = useContext(TicketBookingContext);
  const Email = Tickets?.TicketBooking?.Email;

  const numberOfChildren = Tickets?.TicketBooking?.NumOfChildren || 0;
  const NumberOfAdults = Tickets?.TicketBooking?.NumOfAdult || 0;
  const Date = Tickets?.TicketBooking?.date;
  const EdVisit = Tickets?.TicketBooking?.EdVisit;

  //HandleSubmit for form
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/TicketBookings",
        {
          Email: Email,
          EdVisit: EdVisit,
          Date: Date,
          numberOfChildren: numberOfChildren,
          NumberOfAdults: NumberOfAdults,
        }
      );
      setMessage(JSON.stringify(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.message);
      } else {
        setMessage(String(error));
      }
    }
  };

  return (
    <>
      <h1>Confirm Booking Details</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="TicketSummary">
          <div className="container">
            <div className="row">
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
                Subtotal for child ticket: £{numberOfChildren * 10}
              </p>
              <p className="summaryText">
                Subtotal for Adult ticket: £{NumberOfAdults * 20}
              </p>
              <p className="summaryText">
                Subtotal: £{numberOfChildren * 10 + NumberOfAdults * 20}
              </p>
              <button className="Login" type="submit">
                Checkout
              </button>

              {message}
            </div>
          </div>
          <br></br>
        </div>
      </form>
      <br></br>
      <br></br>
    </>
  );
}

export default TicketSummary;
