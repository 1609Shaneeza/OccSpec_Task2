import React, { FormEvent, useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import InputMask from "react-input-mask";
import axios from "axios";
import { ROOMBOOKINGSUMMARY } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";
import { CheckAvailabilityContext } from "./AvailabilityProvider";
import { useContext } from "react";

function RoomCheckout() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCVC] = useState("");
  const RoomBookSummary = useContext(CheckAvailabilityContext);
  const navigate = useNavigate();

  const d = new Date();
  const DateOfPayment =
    d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCVC(value.slice(0, 3));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const RoomEmail = RoomBookSummary?.CheckRooms?.Email;

    if (!RoomEmail) {
      console.error("RoomEmail is null or empty.");
      return;
    }

    try {
      const Response = await axios.post("http://localhost:5000/Checkout", {
        name: name,
        Email: RoomEmail,
        cardNumber: cardNumber,
        expDate: expDate,
        cvc: cvc,
        DateOfPayment: DateOfPayment,
      });

      if (Response.data["success"]) {
        navigate(ROOMBOOKINGSUMMARY);
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
                    maxLength={3}
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

export default RoomCheckout;
