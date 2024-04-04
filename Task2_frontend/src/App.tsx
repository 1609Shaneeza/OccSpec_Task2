import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import AboutUs from "./Components/AboutUs";
import { ATTRACTIONS, DASHBOARD, FACILITIES, HOME, LOGIN, NOT_FOUND, SIGNUP } from "./Constants/Constants";
import Facilities from "./Components/Facilities";
import Attractions from "./Components/Attractions";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/StaffDashBoard";
import CredentialProvider from "./Components/CredentialsProvider";


function App() {

  return (
    <>
      <CredentialProvider>
        <Navbar />

        <Routes>
          <Route path={HOME} index element={<Homepage />} />
          <Route path={FACILITIES} index element={<Facilities />} />
          <Route path={ATTRACTIONS} index element={<Attractions />} />
          <Route path={NOT_FOUND} index element={<NotFound />} />
          <Route path={LOGIN} index element={<Login />} />
          <Route path={SIGNUP} index element={<Signup />} />
          <Route path={DASHBOARD} index element={<Dashboard />} />
        </Routes>
        <AboutUs />
      </CredentialProvider>
    </>
  );
}

export default App
