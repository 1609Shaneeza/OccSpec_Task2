import { FormEvent, useEffect, useState } from "react";
import Logo from "../assets/RZA_LOGO.png";
import {
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

function Login() {
  useEffect(() => {
    document.title = "Login";
  });

  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
  };

  return (
    <>
      <div className="Container text-center">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <MDBContainer className="my-5">
              <MDBCard>
                <MDBRow className="g-0">
                  <MDBCol lg="6" md="12">
                    <MDBCardImage src={Logo} className="rounded-start w-90" />
                  </MDBCol>

                  <MDBCol lg="6" md="12">
                    <MDBCardBody className="d-flex flex-column">
                      <div className="d-flex flex-row mt-2">
                        <span className="h1 fw-bold mb-0">Bean & Brew</span>
                      </div>

                      <h5
                        className="fw-normal my-4 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login into your account
                      </h5>

                      <MDBInput
                        onChange={(e) => setEmail(e.target.value)}
                        label="Username"
                        id="Username"
                        type="email"
                        required
                      />
                      <MDBInput
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        id="Password"
                        type={showPass ? "text" : "password"}
                        required
                      />

                      <div className="d-flex justify-content-center mb-4">
                        <MDBCheckbox
                          name="flexCheck"
                          onChange={() => setShowPass((prev) => !prev)}
                          id="showPassword"
                          className="mb-4"
                          label="Show Password"
                        />
                      </div>

                      <button className="Login" type="submit">
                        Login
                      </button>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBContainer>
            {message}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;