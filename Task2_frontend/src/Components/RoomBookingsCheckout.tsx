import {
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

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
  return (
    <>
      <MDBCard
        className="Display px-1 py-1 mx-1 my-2"
        style={{ width: "17rem" }}
      >
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
          <MDBCardTitle>{RoomsType}</MDBCardTitle>
          <MDBCardText>
            <p>Price: £{Price}</p>
            <p>Availability: {Availability}</p>
            <p>Capacity: {Capacity}</p>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

export default RoomBookingCheckout;
