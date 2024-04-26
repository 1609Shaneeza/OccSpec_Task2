import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import BookingDisplay, { RoomBookingProps } from "./BookingDisplay";
import { CheckAvailabilityContext } from "./AvailabilityProvider";
import { BookedRoomContext } from "./RoomsProvider";
import { CHECKOUT, ROOMCHECKOUT } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";

function RoomsDisplay1() {
  const [Rooms, setRooms] = useState([]);
  const [BookedRooms, setBookedRooms] = useState([]);
  const [Message, setMessage] = useState("");

  const Check_Availability = useContext(CheckAvailabilityContext);
  const RoomsBookedContext = useContext(BookedRoomContext);

  const StartDate = Check_Availability?.CheckRooms?.StartDate;
  const EndDate = Check_Availability?.CheckRooms?.EndDate;

  const navigate = useNavigate();

  console.log(StartDate, EndDate);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const Response = await axios.post("http://localhost:5000/RoomDataCheck", {
        RoomType: RoomsBookedContext?.BookedRoom,
      });

      setMessage(JSON.stringify(Response.data));

      if (Response.data["success"]) {
        navigate(ROOMCHECKOUT);
      }


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
      <h1 className="text-center"> Available Rooms</h1>
      <form
        onSubmit={handleSubmit}
        className="RoomBookings1 col col-lg-auto mx-1 my-1"
      >
        <div className="container text-center">
          <div className="row ">
            <div className="  col">
              <Row fluid={true}>
                {Rooms.map((RoomData: RoomBookingProps) => (
                  <BookingDisplay
                    key={RoomData.RoomType}
                    RoomType={RoomData.RoomType}
                    Price={RoomData.Price}
                    Availability={RoomData.Availability}
                    Capacity={RoomData.Capacity}
                    URL={RoomData.URL}
                  />
                ))}
              </Row>
            </div>
          </div>
        </div>
        <button type="submit" className="Booking">
          Checkout
        </button>
      </form>
    </>
  );
}

export default RoomsDisplay1;
