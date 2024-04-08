import { DatePicker, DatePickerInput } from "@carbon/react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FormEvent, useContext, useState } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HOME } from "../Constants/Constants";

function TicketBooking() {
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [EdVisit, setEdVisit] = useState("");
  const [date, setDate] = useState(Date());
  const [NumOfAdult, setNumOfAdult] = useState<any | null>(null);
  const [NumOfChildren, setNumOfChildren] = useState<any | null>(null);
  const Ticket_Context = useContext(TicketBookingContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const Response = await axios.post(
        "http://localhost:5000/EmailCheckTicketsBooking",
        {
          Email: Email,
        }
      );

      setMessage(JSON.stringify(Response.data));

      if (Response.data["success"] == true) {
        Ticket_Context?.setTicketBooking({
          Email,
          EdVisit,
          date,
          NumOfAdult,
          NumOfChildren,
        });
        navigate(HOME)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.message);
      } else {
        setMessage(String(error));
      }
    }
  };

  console.log(date);

  return (
    <>
      <br></br>
      <div className="Container">
        <div className="row col col-lg-9 mx-5">
          <div className=" Tickets col col-lg-4">
            <h3 className="Prices text-center fs-2">Ticket Prices</h3>
            <br></br>
            <p className="Prices text-center fs-4">Adult - £20</p>
            <p>Adults Over the Age of 16</p>
            <br></br>
            <p className="Prices text-center fs-4">Child - £10</p>
            <p>Children Under the Age of 16</p>
          </div>
          <div className="col col-lg-8">
            <div className="Tickets">
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
                    <p>Is this a Educational Visit ?</p>
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
                      onChange={(e) => setNumOfAdult(e.target.value)}
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
                      onChange={(e) => setNumOfChildren(e.target.value)}
                      id="NumberOfChildren"
                      type="Number"
                      min={0}
                      max={30}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <br></br>
                <button className="Signup" type="submit">
                  Book Tickets
                </button>
                <br></br>
              </form>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}

export default TicketBooking;
