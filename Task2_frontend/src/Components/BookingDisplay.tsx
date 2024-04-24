import { MDBCard, MDBRipple, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { useContext, FormEvent } from "react";
import { BookedRoomContext } from "./RoomsProvider";


export interface RoomBookingCards {
    RoomType: string,
    Price: string,
    Availability: number,
    capacity: number,
    URL: string,
}

function BookingDisplay({RoomType, Price, Availability, capacity, URL}:RoomBookingCards) {

      const RoomsBookedContext = useContext(BookedRoomContext);
      Object.keys(RoomsBookedContext!.BookedRoom);

      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
      };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage src={URL} fluid />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
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
                type="submit"
                onClick={() => RoomsBookedContext!.addToBooking(RoomType)}
              >
                Book
              </button>
            </MDBCardBody>
          </MDBCard>
        </form>
      </>
    );
}

export default BookingDisplay;