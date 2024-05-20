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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResponseData {
  success: boolean;
  Account: boolean;
}

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const credentials_Context = useContext(AccountCredentialsContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<ResponseData>(
        "http://localhost:5000/Login",
        {
          Email,
          Password,
        }
      );

      if (response.data.success && response.data.Account) {
        credentials_Context?.setAccountDetails({ Email, Password });
        navigate(HOME);
        toast.success("Login Successful");
      } else if (response.data.success && !response.data.Account) {
        credentials_Context?.setAccountDetails({ Email, Password });
        navigate(DASHBOARD);
        toast.success("Login Successful");
      } else {
        console.log("Incorrect Login Details");
        toast.error("Email Does not Exist");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <br />
      <div className="Container text-center">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <MDBContainer className="my-auto">
              <MDBCard>
                <MDBRow className="g-0">
                  <MDBCol lg="5" md="10">
                    <MDBCardImage
                      src={Logo}
                      className="rounded-start w-80"
                      style={{ width: "100%" }}
                    />
                  </MDBCol>

                  <MDBCol lg="6" md="12">
                    <MDBCardBody className="Loginn d-flex flex-column">
                      <div className="d-flex flex-row mt-2">
                        <span className="h1 fw-bold mb-auto">
                          Riget Zoo Adventures
                        </span>
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
                      <br />
                      <p>Password</p>
                      <input
                        className="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="Password"
                        type={showPass ? "text" : "password"}
                        required
                      />
                      <br />
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
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
