import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

export interface ManageRoomBookingProps{
    RoomType: number;
    StartDate: String;
    EndDate: string;
    NumberOfRooms: number;
    TotalCost: string;
    PaymentDate: string;
    URL: string;
}

function ManageBookings({RoomType, StartDate, EndDate, NumberOfRooms, TotalCost, PaymentDate, URL}: ManageRoomBookingProps) {
    return (
      <>
        <MDBCard>
          <MDBCardImage src={URL} position="top" />
          <MDBCardBody>
            <MDBCardTitle>{RoomType}</MDBCardTitle>
            <MDBCardText>
              <p>Dates: {StartDate} - {EndDate}</p>
              <p>NumberOfRooms: {NumberOfRooms}</p>
              <p>Total: £{TotalCost}</p>
              <p>Payment Date: {PaymentDate}</p>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </>
    );
}

export default ManageBookings;