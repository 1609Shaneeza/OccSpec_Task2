// imports for Check availability
import {
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { FormEvent, useState } from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';;
import Room from "../assets/Room1.png";

//check availability function
function CheckAvailability() {
  const [email, setEmail] = useState("");
  const [MessageText, setMessage] = useState("");
  const [numberOfGuests, setNumOfGuests] = useState(0);
  const [numberOfRooms, setNumOfRooms] = useState(0);
  const [dateFrom, setDateFrom] = useState(Date());
  const [dateTo, setDateTo] = useState(Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  //handleSubmit for form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <br />
      <br />
      {/* //form for Check availability */}
      <div className="Container text-center">
        <form onSubmit={handleSubmit}>
          <MDBContainer className="my-auto">
            <MDBCard>
              <MDBRow className="g-0">
                <MDBCol lg="6" md="12">
                  {/* Image for Form */}
                  <MDBCardImage
                    src={Room}
                    className="rounded-start w-200"
                    style={{ width: "100%", height: "100%" }}
                  />
                </MDBCol>

                <MDBCol lg="6" md="12">
                  <MDBCardBody className=" Availability d-flex flex-column text-center">
                    <div className="d-flex flex-row mt-1 text-center">
                      {/* Title/heading for form */}
                      <span className="h1 fw-bold mb-auto text-center">
                        Check Availability for Rooms
                      </span>
                    </div>
                    {/* Input field for the form -- inputs include Email, Number of guests,
                      Number of Rooms needed, Date From and date To 
                      Email - input type: email
                      Number of guests: input type: number
                      Number of rooms needed -- input type: number
                      Date From -- input type: Date
                      Date To -- input type: Date*/}
                    <MDBRow>
                      <MDBCol>
                        <br></br>
                        <p>Email</p>
                        <input
                          className="Email"
                          placeholder="name@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                          id="Username"
                          type="email"
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                      <MDBCol>
                        <p>Number Of Guests</p>
                        <input
                          onChange={(e) =>
                            setNumOfGuests(parseInt(e.target.value))
                          }
                          id="NumberOfGuests"
                          type="Number"
                          min={0}
                          max={20}
                          required
                        />
                      </MDBCol>
                      <br></br>
                      <MDBCol>
                        <p>Number Of Rooms</p>
                        <input
                          onChange={(e) =>
                            setNumOfRooms(parseInt(e.target.value))
                          }
                          id="NumberOfRooms"
                          type="Number"
                          min={0}
                          max={10}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          startDate={startDate}
                          endDate={endDate}
                          selectsStart
                          placeholderText="Start Date"
                          className="custom-date-picker"
                        />
                      </MDBCol>
                      <MDBCol>
                        {/* End Date Picker */}
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          startDate={startDate}
                          endDate={endDate}
                          selectsEnd
                          placeholderText="End Date"
                          className="custom-date-picker"
                        />
                      </MDBCol>
                    </MDBRow>

                    <br />
                    <br></br>
                    {/* Submit button to check availability */}
                    <button className="Login" type="submit">
                      Check Availability
                    </button>
                    <br></br>
                    <br></br>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
        </form>
      </div>
      <br />
      <br />
    </>
  );
}

export default CheckAvailability;
