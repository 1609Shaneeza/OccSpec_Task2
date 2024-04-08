import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCheckbox } from "mdb-react-ui-kit";
import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import RZALogo from "../assets/RZA_LOGO.png";
import axios from "axios";
import { LOGIN } from "../Constants/Constants";


function Signup() {
    useEffect(() => {
        document.title = "SignIn";
      });
    
      const [Name, setName] = useState("");
      const [Surname, setSurname] = useState("");
      const [Email, setEmail] = useState("");
      const [Password, setPassword] = useState("");
      const [ConfirmPassword, setConfirmPassword] = useState("");
      const [MessageText, setMessage] = useState("");
      const [showPass, setShowPass] = useState(false);
    
      const navigate = useNavigate()
    
      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage("");

        if (
          !Password.match(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@#$%^_&-+=]+){5,16}$/
          )
        ) {
          setMessage("Weak Password");
          return;
        }

        if (Password !== ConfirmPassword) {
          setMessage("Passwords donot match");
          return;
        } else {
          setMessage("Account Created");
        }


        try {
          const Response = await axios.post("http://localhost:5000/SignUp", {
            Name: Name,
            Surname: Surname,
            Password: Password,
            ConfirmPassword: ConfirmPassword,
            Email: Email,
          });

          if (Response.data["success"]) {
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


      }


    return (
      <>
        <form onSubmit={handleSubmit}>
          <MDBContainer fluid className="my-5">
            <MDBRow className="g-0 align-items-center">
              <MDBCol col="6">
                <MDBCard
                  className="my-6 cascading-right"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <MDBCardBody className=" SignIn p-5 shadow-6 text-center">
                    <h2 className="fw-bold mb-5">Register Now</h2>

                    <MDBRow>
                      <MDBCol col="2">
                        <p>Name</p>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          id="Name"
                          type="text"
                          required
                        />
                      </MDBCol>

                      <MDBCol col="2">
                        <p>Surname</p>
                        <input
                          onChange={(e) => setSurname(e.target.value)}
                          id="Surname"
                          type="text"
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <p>Email</p>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="Email"
                      type="email"
                      required
                    />

                    <MDBRow>
                      <MDBCol col="3">
                        <p>Password</p>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          type={showPass ? "text" : "password"}
                          required
                        />
                      </MDBCol>

                      <MDBCol col="3">
                        <p>Confirm Password</p>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="confirmPassword"
                          type={showPass ? "text" : "password"}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
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

                    <button className="Signup" type="submit">
                      Signup
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol className="Picture" col="8">
                <img
                  src={RZALogo}
                  className="w-100 rounded-4 shadow-4"
                  alt=""
                  style={{ width: "100%" }}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          {MessageText}
        </form>
      </>
    );
}

export default Signup;