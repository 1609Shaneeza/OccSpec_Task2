import { FormEvent, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Logo from "../assets/Logo_RZA.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../Constants/Constants";

function AddingStaff() {
  useEffect(() => {
    document.title = "SignIn";
  });

  const [StaffName, setStaffName] = useState("");
  const [StaffSurname, setStaffSurname] = useState("");
  const [StaffDOB, setStaffDOB] = useState("");
  const [StaffEmail, setStaffEmail] = useState("");
  const [StaffUsername, setStaffUsername] = useState("");
  const [StaffRole, setRole] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [MessageText, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

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
      setMessage("AccountCreated");
    }

    try {
      const Response = await axios.post("http://localhost:5000/AddingStaff", {
        StaffName: StaffName,
        StaffSurname: StaffSurname,
        StaffDOB: StaffDOB,
        StaffUsername: StaffUsername,
        Password: Password,
        ConfirmPassword: ConfirmPassword,
        StaffEmail: StaffEmail,
        StaffRole: StaffRole,
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
  };

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
                <MDBCardBody className="p-6 shadow-6 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>

                  <MDBRow>
                    <MDBCol col="6">
                      <p>Name</p>
                      <MDBInput
                        onChange={(e) => setStaffName(e.target.value)}
                        id="Name"
                        type="text"
                        required
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <p>Surname</p>
                      <MDBInput
                        onChange={(e) => setStaffSurname(e.target.value)}
                        id="Surname"
                        type="text"
                        required
                      />
                    </MDBCol>

                    <MDBCol col="4">
                      <p>Date of Birth</p>
                      <MDBInput
                        onChange={(e) => setStaffDOB(e.target.value)}
                        id="DOB"
                        type="date"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <br></br>
                  <MDBRow>
                    <MDBCol col="4">
                      <p>Select Role</p>
                      <select
                        className="form-select"
                        aria-label="Default select"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option selected>Select Role</option>
                        <option value="General Manager">General Manager</option>
                        <option value="Staff">Staff</option>
                        <option value="Store Manager">Store Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </MDBCol>
                    <MDBCol>
                      <p>Email</p>
                      <MDBInput
                        onChange={(e) => setStaffEmail(e.target.value)}
                        id="Email"
                        type="email"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <br></br>

                  <MDBRow>
                    <MDBCol col="3">
                      <p>Username</p>
                      <MDBInput
                        onChange={(e) => setStaffUsername(e.target.value)}
                        id="username"
                        type="text"
                        required
                      />
                    </MDBCol>

                    <MDBCol col="3">
                      <p>Password</p>
                      <MDBInput
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type={showPass ? "text" : "password"}
                        required
                      />
                    </MDBCol>

                    <MDBCol col="3">
                      <p>Confim Password</p>
                      <MDBInput
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

                  <button className="Signin" type="submit">
                    Add Staff
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol className="Picture" col="8">
              <img
                src={Logo}
                className="w-100 rounded-4 shadow-4"
                alt=""
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {MessageText}
      </form>
    </>
  );
}

export default AddingStaff;
