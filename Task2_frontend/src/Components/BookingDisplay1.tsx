import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import BookingDisplay, { RoomBookingCards } from "./BookingDisplay";
import { CheckAvailabilityContext } from "./AvailabilityProvider";



function RoomsDisplay1() {
    const [Rooms, setRooms] = useState([]);

    const Check_Availability = useContext(CheckAvailabilityContext);

    const StartDate = Check_Availability?.CheckRooms?.StartDate;
    const EndDate = Check_Availability?.CheckRooms?.EndDate;

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
          setRooms(response?.data?.result);
        } catch (error) {
          console.error("Error fetching pre-orders:", error);
        }
      };

      getRoomData();
    }, []);


    return (
      <>
        <h1 className="text-center">Educational Materials </h1>
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-1">
            <div className="col">
              <Row fluid>
                {Rooms.map((EducationalMaterial: RoomBookingCards) => (
                  <BookingDisplay
                    key={EducationalMaterial.RoomType}
                    RoomType={EducationalMaterial.RoomType}
                    Price={EducationalMaterial.Price}
                    Availability={EducationalMaterial.Availability}
                    capacity={EducationalMaterial.capacity}
                    URL={EducationalMaterial.URL}
                  />
                ))}
              </Row>
            </div>
          </div>
        </div>
      </>
    );
}

export default RoomsDisplay1;