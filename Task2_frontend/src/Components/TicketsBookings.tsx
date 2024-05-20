import React, { FormEvent, useContext, useState } from "react";
import { DatePicker } from "@carbon/react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { TicketBookingContext } from "./TicketBookingProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CHECKOUT } from "../Constants/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TicketsBookings() {
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [EdVisit, setEdVisit] = useState("");
  const [date, setDate] = useState("");
  const [NumOfAdult, setNumOfAdult] = useState(0);
  const [NumOfChildren, setNumOfChildren] = useState(0);
  const Type = "TicketBooking";
  const Ticket_Context = useContext(TicketBookingContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/EmailCheckTicketsBooking",
        {
          Email,
        }
      );

      if (response.data.success) {
        console.log("Value of EdVisit is: " + EdVisit);
        Ticket_Context?.setTicketBooking({
          Type,
          Email,
          EdVisit,
          date,
          NumOfAdult,
          NumOfChildren,
        });
        toast.success("Booking Successful! Redirecting to checkout...");
        navigate(CHECKOUT);
      } else {
        setMessage("Email does not exist");
        toast.error("Email does not exist");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.message);
        toast.error(error.message);
      } else {
        setMessage(String(error));
        toast.error(String(error));
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <br />
      <h1>Book Tickets for the RZA Zoo</h1>
      <div className="Container">
        <div className="row col col-lg-9 mx-5">
          <div className=" Tickets col col-lg-4">
            <h3 className="Prices text-center fs-2">Ticket Prices</h3>
            <br />
            <p className="Prices text-center fs-4">Adult - £20</p>
            <p>Adults Over the Age of 16</p>
            <br />
            <p className="Prices text-center fs-4">Child - £10</p>
            <p>Children Under the Age of 16</p>
          </div>
          <div className="col col-lg-8">
            <div className="Tickets">
              <h3>Book Tickets</h3>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col="2">
                    <p>Email</p>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="Email"
                      type="Email"
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <DatePicker>
                      <p>Date</p>
                      <input
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        id="date-picker"
                        type="date"
                      />
                    </DatePicker>
                  </MDBCol>
                  <MDBCol className="Visit">
                    <p>Is this an Educational Visit?</p>
                    <select
                      className="form-select"
                      aria-label="Default select"
                      onChange={(e) => setEdVisit(e.target.value)}
                    >
                      <option selected>Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <p>Number Of Adults</p>
                    <input
                      onChange={(e) => setNumOfAdult(parseInt(e.target.value))}
                      id="NumberOfAdults"
                      type="Number"
                      min={1}
                      max={30}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <p>Number Of Children</p>
                    <input
                      onChange={(e) =>
                        setNumOfChildren(parseInt(e.target.value))
                      }
                      id="NumberOfChildren"
                      type="Number"
                      min={0}
                      max={30}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <br />
                <br />
                <button className="Signup" type="submit">
                  Book Tickets
                </button>
                <br />
                {Message}
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default TicketsBookings;
