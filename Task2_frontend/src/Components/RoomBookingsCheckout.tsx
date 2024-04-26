import {
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { FormEvent } from "react";

export interface RoomBookingsCards {
  RoomsType: string;
  Price: string;
  Availability: number;
  Capacity: number;
  URL: string;
}

function RoomBookingCheckout({
  RoomsType,
  Price,
  Availability,
  Capacity,
  URL,
}: RoomBookingsCards) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="w-auto" onSubmit={handleSubmit}>
        <MDBCard
          className="Display px-1 py-1 mx-1 my-2"
          style={{ width: "17rem" }}
        >
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={URL} fluid className="ImageRoom" />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{RoomsType}</MDBCardTitle>
            <MDBCardText>
              <p className="RoomsTxt">Price: £{Price}</p>
              <p className="RoomsTxt"> Availability: {Availability}</p>
              <p className="RoomsTxt">Capacity: {Capacity}</p>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </form>
    </>
  );
}

export default RoomBookingCheckout;
