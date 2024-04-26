import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BookedRoomContext } from "./RoomsProvider";
import { CheckAvailabilityContext } from "./AvailabilityProvider";
import RoomBookingCheckout, { RoomBookingsCards } from "./RoomBookingsCheckout";
import { Row } from "react-bootstrap";


function RoomBookingSummary() {

      const formatDateString = (dateString: string | number | Date | null | undefined) => {
        if (!dateString) return ""; // Handle case where dateString is undefined
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
      };

    const [DisplayBookedRooms, SetDisplayRooms] = useState([]);
    const [Message, setMessage] = useState("");
    

    const RoomsBookings = useContext(BookedRoomContext);
    const RoomBookSummary = useContext(CheckAvailabilityContext);


    const Email = RoomBookSummary?.CheckRooms?.Email;
    const NumberOfRooms = RoomBookSummary?.CheckRooms?.NumOfRooms;
    const NumberOfGuests = RoomBookSummary?.CheckRooms?.NumOfGuests;
    const CheckInDate = formatDateString(
      RoomBookSummary?.CheckRooms?.StartDate
    );
    const CheckOutDate = formatDateString(RoomBookSummary?.CheckRooms?.EndDate);


    useEffect(() => {
      document.title = "RoomsDisplay";
    }, []);

    useEffect(() => {
      const getRoomDisplayData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/RoomSummaryDisplay",
            {
              RoomType: RoomsBookings?.BookedRoom,
            }
          );
          SetDisplayRooms(response?.data?.result || []);
        } catch (error) {
          console.error("Error fetching RoomDisplayData:", error);
        }
      };
      console.log(DisplayBookedRooms);

      getRoomDisplayData();
    }, []);

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
          const Response = await axios.post("http://localhost:5000/RoomBookingAddedToDatabase", {
            Email: Email,
            NumberOfGuests: NumberOfGuests,
            NumberOfRooms: NumberOfRooms,
            CheckInDate: CheckInDate,
            CheckOutDate: CheckOutDate,
            RoomType: RoomsBookings?.BookedRoom,
          });

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
        <h1>Confirm Your Booking</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="RoomBookingSummary container text-center col col-lg-9">
            <div className="row">
              <div className="Roomss col">
                <Row fluid>
                  {DisplayBookedRooms.map((RoomsData: RoomBookingsCards) => (
                    <RoomBookingCheckout
                      key={RoomsData.RoomsType}
                      RoomsType={RoomsData.RoomsType}
                      Price={RoomsData.Price}
                      Availability={RoomsData.Availability}
                      Capacity={RoomsData.Capacity}
                      URL={RoomsData.URL}
                    />
                  ))}
                </Row>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <br></br>
                <h2>Booking Details</h2>
                <br></br>
                <p className="RoomsTxt">Email: {Email}</p>
                <p className="RoomsTxt">Number Of Guests: {NumberOfGuests}</p>
                <p className="RoomsTxt">Number of Rooms: {NumberOfRooms}</p>
                <p className="RoomsTxt">Check-in Date: {CheckInDate}</p>
                <p className="RoomsTxt">Check-out Date: {CheckOutDate}</p>
                <br />
                <p></p>
              </div>
            </div>
            <button type="submit" className="Booking">
              Confirm Booking
            </button>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <br></br>
        </form>
        <br></br>
      </>
    );
}

export default RoomBookingSummary;