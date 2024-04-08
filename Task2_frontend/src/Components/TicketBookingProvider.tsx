import { ReactNode, createContext } from "react";
import TicketsBook, { TicketContextType } from "./TicketsBook";



export const TicketBookingContext = createContext<TicketContextType | null>(null);


function TicketBookingProvider({children}:{ children:ReactNode}) {
    const ticketDetailsContext = TicketsBook();

    return (
        <TicketBookingContext.Provider value={ticketDetailsContext}>
            {children}
        </TicketBookingContext.Provider>
    )
}

export default TicketBookingProvider;