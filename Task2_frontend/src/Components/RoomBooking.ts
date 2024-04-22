import { useState } from "react";

const ROOM_BOOK = "Room-Bookings";

interface RoomTypes {
  Type: string;
  Email: string;
  NumOfGuests: number;
  NumOfRooms: number;
  StartDate: string;
  EndDate: string;
}

export interface RoomContextType {
  RoomBooking: RoomTypes | null;
  setRoomBooking: (newRoomBookings: RoomTypes) => void;
}

function RoomsBook(): RoomContextType {
  const RoomsString = sessionStorage.getItem(ROOM_BOOK);
  const RoomsObject = RoomsString ? JSON.parse(RoomsString) : null;

  const [RoomBooking, setRoomBooking] = useState(RoomsObject);

  const saveRoomBookingDetail = (newRoomBookings: RoomTypes) => {
    sessionStorage.setItem(ROOM_BOOK, JSON.stringify(newRoomBookings));
    setRoomBooking(newRoomBookings);
    console.log(newRoomBookings);
  };

  return {
    RoomBooking,
    setRoomBooking: saveRoomBookingDetail,
  };
}

export default RoomsBook;
