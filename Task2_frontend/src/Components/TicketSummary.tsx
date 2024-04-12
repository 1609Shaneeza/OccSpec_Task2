import { useContext, useState } from "react";
import { TicketBookingContext } from "./TicketBookingProvider";

function TicketSummary() {
    const Tickets = useContext(TicketBookingContext)

    const numberOfChildren = Tickets?.TicketBooking?.NumOfChildren || 0;
    const NumberOfAdults = Tickets?.TicketBooking?.NumOfAdult || 0;

    // console.log("Number of children: ",numberOfChildren);
    // console.log("Number of adults: ", NumberOfAdults);
    // console.log("Email: ", Tickets?.TicketBooking?.Email);
    // console.log("Ed Visit:", Tickets?.TicketBooking?.EdVisit);
    // console.log("Date:", Tickets?.TicketBooking?.date);

    
    // const People = () => {
    //     let totalPeople = 0
    //     totalPeople += numberOfChildren + NumberOfAdults;
    //     return totalPeople
    // }
    // console.log(People)

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
                    <p>Number of People: {}</p>
                    <p></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default TicketSummary;