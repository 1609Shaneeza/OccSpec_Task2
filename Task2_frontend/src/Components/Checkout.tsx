//Imports for Checkout page
//Imports for Checkout page
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import InputMask from "react-input-mask";
import axios from "axios";
import { TicketBookingContext } from "./TicketBookingProvider";
import { TICKETSUMMARY } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

//Checkout function
function Checkout() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [Email, setEmail] = useState("");
  const Tickets = useContext(TicketBookingContext || null);
  const navigate = useNavigate();

  const d = new Date();
  const DateOfPayment =
    d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  const TicketEmail = Tickets?.TicketBooking?.Email;

  //Document title
  useEffect(() => {
    document.title = "Checkout";
  });

  //Validation for CVC
  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric characters
    if (/^\d*$/.test(value)) {
      // Limit to 3 characters
      setCVC(value.slice(0, 3));
    }
  };

  //HandleSubmit for form
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!TicketEmail || !Email) {
      console.error("TicketEmail or Email is null or empty.");
      return;
    }

    // Check if TicketEmail matches Email
    if (TicketEmail !== Email) {
      setEmail(TicketEmail); // Set Email to TicketEmail if they are different
    }


    try {
      const Response = await axios.post("http://localhost:5000/Checkout", {
        name: name,
        Email: Email,
        cardNumber: cardNumber,
        expDate: expDate,
        cvc: cvc,
        DateOfPayment: DateOfPayment,
      });

      if (Response.data["success"]) {
        navigate(TICKETSUMMARY);
      }

      setMessage(JSON.stringify(Response.data));
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
      {/* Form for Checkout
    Inputs needed Name on card, Card Number, CVC, expiry date
    data Types for all inputs "String" */}
      <h1>Please Pay Here</h1>
      <br />
      <div className="TicketSummary">
        <div className="container">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <br />
              <MDBRow>
                <MDBCol col="5">
                  <p>Name On Card</p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    id="Name"
                    type="text"
                    required
                  />
                </MDBCol>
                <MDBCol col="6">
                  <p>Card Number</p>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    onChange={(e) => setCardNumber(e.target.value)}
                    id="CardNumber"
                    type="text"
                    value={cardNumber}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <br />
              <MDBRow>
                <MDBCol>
                  <p>Expiry Date</p>
                  <InputMask
                    mask="99/99"
                    onChange={(e) => setExpDate(e.target.value)}
                    id="ExpiryDate"
                    type="text"
                    required
                  />
                </MDBCol>
                <MDBCol>
                  <p>CVV</p>
                  <input
                    onChange={handleCVCChange}
                    id="CVCNumber"
                    type="text"
                    value={cvc}
                    maxLength={3} // Add maxLength attribute to limit input length
                    required
                  />
                </MDBCol>
              </MDBRow>
              <br />
              <button className="Login" type="submit">
                Checkout
              </button>
              <br></br>
              <br></br>
              {message}
            </form>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}

export default Checkout;
