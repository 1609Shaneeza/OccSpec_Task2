import {
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useContext, FormEvent } from "react";
import { BookedRoomContext } from "./RoomsProvider";

export interface RoomBookingProps {
  RoomType: string;
  Price: string;
  Availability: number;
  capacity: number;
  URL: string;
}

function BookingDisplay({
  RoomType,
  Price,
  Availability,
  capacity,
  URL,
}: RoomBookingProps) {
  const RoomsBookedContext = useContext(BookedRoomContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(RoomsBookedContext?.BookedRoom);
  };

  // console.log(RoomsBookedContext?.BookedRoom)
  // consol
  return (
    <>
      <form onSubmit={handleSubmit} className="w-auto">
        <MDBCard
          className="Display px-1 py-1 mx-1 my-2"
          style={{ width: "17rem" }}
        >
          <MDBRow>
            <MDBCol>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage src={URL} fluid className="ImageRoom" />
                <a>
                  <div className="mask"></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{RoomType}</MDBCardTitle>
                <MDBCardText>
                  <p>Price: £{Price}</p>
                  <p>Availability: {Availability}</p>
                  <p>Capacity: {capacity}</p>
                </MDBCardText>
                <button
                  className="DispayButton"
                  type="submit"
                  onClick={() => RoomsBookedContext?.addToBooking(RoomType)}
                >
                  Book
                </button>
                <br></br>
              </MDBCardBody>
            </MDBCol>
            <br></br>
          </MDBRow>
        </MDBCard>
      </form>
    </>
  );
}

export default BookingDisplay;
