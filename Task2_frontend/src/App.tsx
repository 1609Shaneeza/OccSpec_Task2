import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import AboutUs from "./Components/AboutUs";
import {
  ATTRACTIONS,
  AVAILABILITY,
  CHECKOUT,
  DASHBOARD,
  EDUCATION,
  FACILITIES,
  HOME,
  LOGIN,
  NOT_FOUND,
  ROOMBOOKINGSUMMARY,
  ROOMCHECKOUT,
  ROOMDISPLAY,
  SIGNUP,
  TICKETS,
  TICKETSUMMARY,
} from "./Constants/Constants";
import Facilities from "./Components/Facilities";
import Attractions from "./Components/Attractions";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/StaffDashBoard";
import CredentialProvider from "./Components/CredentialsProvider";
import EducationMaterials1 from "./Components/EducationalMaterials1";
import Checkout from "./Components/Checkout";
import TicketSummary from "./Components/TicketCheckout";
import TicketsBookings from "./Components/TicketsBookings";
import TicketBookingProvider from "./Components/TicketBookingProvider";
import CheckAvailability from "./Components/CheckAvailability";
import RoomsDisplay1 from "./Components/BookingDisplay1";
import AvailabilityProvider from "./Components/AvailabilityProvider";
import RoomBookingSummary from "./Components/RoomBookingSummary";
import BookedRoomsProvider from "./Components/RoomsProvider";
import RoomCheckout from "./Components/RoomCheckout";

function App() {
  return (
    <>
      <CredentialProvider>
        <TicketBookingProvider>
          <AvailabilityProvider>
            <BookedRoomsProvider>
              <Navbar />

              <Routes>
                <Route path={HOME} index element={<Homepage />} />
                <Route path={FACILITIES} index element={<Facilities />} />
                <Route path={ATTRACTIONS} index element={<Attractions />} />
                <Route path={NOT_FOUND} index element={<NotFound />} />
                <Route path={LOGIN} index element={<Login />} />
                <Route path={SIGNUP} index element={<Signup />} />
                <Route path={DASHBOARD} index element={<Dashboard />} />
                <Route
                  path={EDUCATION}
                  index
                  element={<EducationMaterials1 />}
                />
                <Route path={TICKETS} index element={<TicketsBookings />} />
                <Route path={CHECKOUT} index element={<Checkout />} />
                <Route path={TICKETSUMMARY} index element={<TicketSummary />} />
                <Route path={ROOMDISPLAY} index element={<RoomsDisplay1 />} />
                <Route
                  path={AVAILABILITY}
                  index
                  element={<CheckAvailability />}
                />
                <Route
                  path={ROOMBOOKINGSUMMARY}
                  index
                  element={<RoomBookingSummary />}
                />
                <Route
                  path={ROOMCHECKOUT}
                  index
                  element={<RoomCheckout />}
                />
              </Routes>
              <AboutUs />
            </BookedRoomsProvider>
          </AvailabilityProvider>
        </TicketBookingProvider>
      </CredentialProvider>
    </>
  );
}

export default App;
