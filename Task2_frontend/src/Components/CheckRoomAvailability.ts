import { useState } from "react";

const CHECK_AVAILABILITY = "Check-Availability";

interface AvailabilityTypes {
  Email: string;
  NumOfGuests: number;
  NumOfRooms: number;
  StartDate:string | null;
  EndDate:string | null;
}

export interface CheckContextType {
  CheckRooms: AvailabilityTypes | null;
  setCheckRooms: (newCheckAvailability: AvailabilityTypes) => void;
}

function AvailabilityCheck(): CheckContextType {
  const availabilityString = sessionStorage.getItem(CHECK_AVAILABILITY);
  const availabilityObject = availabilityString ? JSON.parse(availabilityString) : null;

  const [CheckRooms, setCheckRooms] = useState(availabilityObject);

  const saveCheckAvailabilityDetail = (newCheckBookings: AvailabilityTypes) => {
    sessionStorage.setItem(CHECK_AVAILABILITY, JSON.stringify(newCheckBookings));
    setCheckRooms(newCheckBookings);
    console.log(newCheckBookings);
  };

  return {
    CheckRooms,
    setCheckRooms: saveCheckAvailabilityDetail,
  };
}

export default AvailabilityCheck;
