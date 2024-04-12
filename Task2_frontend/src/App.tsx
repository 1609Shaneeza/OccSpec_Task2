import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import AboutUs from "./Components/AboutUs";
import { ATTRACTIONS, CHECKOUT, DASHBOARD, EDUCATION, FACILITIES, HOME, LOGIN, NOT_FOUND, SIGNUP, TICKETS, TICKETSUMMARY } from "./Constants/Constants";
import Facilities from "./Components/Facilities";
import Attractions from "./Components/Attractions";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/StaffDashBoard";
import CredentialProvider from "./Components/CredentialsProvider";
import EducationMaterials1 from "./Components/EducationalMaterials1";
import Checkout from "./Components/Checkout";
import TicketSummary from "./Components/TicketSummary";
import TicketsBookings from "./Components/TicketsBookings";


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
          <Route path={EDUCATION} index element={<EducationMaterials1 />} />
          <Route path={TICKETS} index element={<TicketsBookings />} />
          <Route path={CHECKOUT} index element={<Checkout />} />
          <Route path={TICKETSUMMARY} index element={<TicketSummary />} />
        </Routes>
        <AboutUs />
      </CredentialProvider>
    </>
  );
}

export default App
