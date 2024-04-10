import { useContext, useState } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";


function TicketSummary() {
    const Tickets = useContext(TicketBookingContext)

    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfAdults, setNumberOfAdults] = useState(0);
    

    return(
        <>
        <div className="Container">
            <div className="row">
                <div className="col">
                    <h1>Ticket Booking Summary</h1>
                    <br></br>
                    <br></br>
                    <p>Please Confirm Your Booking</p>
                    <br></br>
                    <p>Email: {Tickets?.TicketBooking?.Email}</p>
                    <p>Educational Visit: {Tickets?.TicketBooking?.EdVisit}</p>
                    <p></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default TicketSummary;