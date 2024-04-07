import React, { FormEvent, useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import InputMask from "react-input-mask";

function Checkout() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCVC] = useState("");

  useEffect(() => {
    document.title = "Checkout";
  });

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric characters
    if (/^\d*$/.test(value)) {
      // Limit to 3 characters
      setCVC(value.slice(0, 3));
    }
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Payment Details</h1>
      <div className="container">
        <div className="row">
          <div className=" Checkout col col-lg-6 mx-5">
            <br />
            <form onSubmit={handleSubmit}>
              <br />
              <MDBRow>
                <MDBCol col="6">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
