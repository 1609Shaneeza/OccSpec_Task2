import { useState } from "react";

const TICKETS_BOOK = "Ticket-Bookings";

interface TicketTypes {
  Email: string;
  EdVisit: string;
  date: string;
  NumOfAdult: Number;
  NumOfChildren: Number;
}

export interface TicketContextType {
  TicketBooking: TicketTypes | null;
  setTicketBooking: (newBookings: TicketTypes) => void;
}

function TicketsBook(): TicketContextType {
  const TicketsString = sessionStorage.getItem(TICKETS_BOOK);
  const TicketsObject = TicketsString ? JSON.parse(TicketsString) : null;

  const [TicketBooking, setTicketBooking] = useState(TicketsObject);

  const saveBookingDetail = (newBookings: TicketTypes) => {
    sessionStorage.setItem(TICKETS_BOOK, JSON.stringify(newBookings));
    setTicketBooking(newBookings);
  };

  return {
    TicketBooking, setTicketBooking: saveBookingDetail
  };
}

export default TicketsBook;
