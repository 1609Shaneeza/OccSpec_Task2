import { DatePicker, DatePickerInput } from "@carbon/react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FormEvent, useState } from "react";

function TicketBooking() {
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
  };

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
                      <DatePickerInput
                        placeholder="mm/dd/yyyy"
                        labelText="Date Picker label"
                        id="date-picker-single"
                        size="md"
                        type="date"
                      />
                    </DatePicker>
                  </MDBCol>
                  <MDBCol className="Visit">
                    <p>Is this a Educational Visit ?</p>
                    <div className="EducationalVisit">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <p>Number Of Adults</p>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
                      id="NumberOfChildren"
                      type="Number"
                      min={1}
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
