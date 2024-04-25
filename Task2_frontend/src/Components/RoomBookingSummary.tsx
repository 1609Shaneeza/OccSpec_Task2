import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BookedRoomContext } from "./RoomsProvider";
import { CheckAvailabilityContext } from "./AvailabilityProvider";
import RoomBookingCheckout, { RoomBookingsCards } from "./RoomBookingsCheckout";
import { Row } from "react-bootstrap";


function RoomBookingSummary() {

    const [DisplayBookedRooms, SetDisplayRooms] = useState([]);

    const RoomsBookings = useContext(BookedRoomContext);
    const RoomBookSummary = useContext(CheckAvailabilityContext);


    const Email = RoomBookSummary?.CheckRooms?.Email;
    const NumberOfRooms = RoomBookSummary?.CheckRooms?.NumOfRooms;
    const NumberOfGuests = RoomBookSummary?.CheckRooms?.NumOfGuests;
    const CheckInDate = RoomBookSummary?.CheckRooms?.StartDate;
    const CheckOutdate = RoomBookSummary?.CheckRooms?.EndDate;

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


    return (
      <>
        <h1>Confirm Your Booking</h1>
        <div className="RoomBookingSummary container text-center">
          <div className="row">
            <div className="col">
              
            </div>
          </div>
          <div className="row">
            <div className="col">
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
        </div>
      </>
    );
}

export default RoomBookingSummary