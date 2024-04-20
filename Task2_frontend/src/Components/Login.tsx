import { FormEvent, useContext, useEffect, useState } from "react";
import Logo from "../assets/RZA_LOGO.png";
import {
  MDBCheckbox,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import axios from "axios";
import { AccountCredentialsContext } from "./CredentialsProvider";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, HOME, LOGIN } from "../Constants/Constants";

function Login() {
  useEffect(() => {
    document.title = "Login";
  });

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const credentials_Context = useContext(AccountCredentialsContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const Response = await axios.post("http://localhost:5000/Login", {
        Email: Email,
        Password: Password,
      });

      if (Response.data["success"] && Response.data["Account"] == true) {
        credentials_Context?.setAccountDetails({Email, Password});
        navigate(HOME);
      } else if (
        Response.data["success"] &&
        Response.data["Account"] == false
      ) {
        credentials_Context?.setAccountDetails({ Email, Password });
        navigate(DASHBOARD);
      } else {
        console.log("Doesnot exist");
        navigate(LOGIN);
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
    <br></br>
      <div className="Container text-center">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <MDBContainer className="my-auto">
              <MDBCard>
                <MDBRow className="g-0">
                  <MDBCol lg="6" md="12">
                    <MDBCardImage src={Logo} className="rounded-start w-90" style={{ width: "100%" }}/>
                  </MDBCol>

                  <MDBCol lg="6" md="12">
                    <MDBCardBody className="Loginn d-flex flex-column">
                      <div className="d-flex flex-row mt-2">
                        <span className="h1 fw-bold mb-auto">Riget Zoo Adventures</span>
                      </div>

                      <h5
                        className="fw-normal my-4 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login into your account
                      </h5>
                      <p>Email</p>
                      <input
                      className="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="Username"
                        type="email"
                        required
                      />
                      <br></br>
                      <p>Password</p>
                      <input
                      className="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="Password"
                        type={showPass ? "text" : "password"}
                        required
                      />
                      <br></br>
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