import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import BookingDisplay, { RoomBookingProps } from "./BookingDisplay";
import { CheckAvailabilityContext } from "./AvailabilityProvider";



function RoomsDisplay1() {
    const [Rooms, setRooms] = useState([]);
    const [BookedRooms, setBookedRooms] = useState([]);
    const [Message, SetMessage] = useState("")

    const Check_Availability = useContext(CheckAvailabilityContext);

    const StartDate = Check_Availability?.CheckRooms?.StartDate;
    const EndDate = Check_Availability?.CheckRooms?.EndDate;


    console.log(StartDate, EndDate)

    useEffect(() => {
      document.title = "RoomsDisplay";
    }, []);


    useEffect(() => {
      const getRoomData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/RoomDataDisplay",
            {
              StartDate: StartDate,
              EndDate: EndDate,
            }
          );
          setRooms(response?.data?.DisplayData || []);
        } catch (error) {
          console.error("Error fetching RoomDisplayData:", error);
        }
      };
      console.log(Rooms);

      getRoomData();
    }, [StartDate, EndDate]);


    return (
      <>
        <h1 className="text-center"> Available Rooms</h1>
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-1">
            <div className="col">
              <Row fluid = {true}>
                {Rooms.map((RoomData:RoomBookingProps) => (
                  <BookingDisplay
                    key={RoomData.RoomType}
                    RoomType={RoomData.RoomType}
                    Price={RoomData.Price}
                    Availability={RoomData.Availability}
                    capacity={RoomData.capacity}
                    URL={RoomData.URL}/>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </>
    );
}

export default RoomsDisplay1;