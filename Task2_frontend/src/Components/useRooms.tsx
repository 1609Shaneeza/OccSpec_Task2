import { useState } from "react";

export interface RoomContextType {
  BookedRoom: { [item: string]: number };
  addToBooking: (item: string) => void;
  removeFromBooking: (item: string) => void;
  deleteFromBooking: (item: string) => void;
}

function useRooms(): RoomContextType {
  const RoomObject = localStorage.getItem("roomItems");
  const [BookedRoom, setBookedRoom] = useState(
    RoomObject ? JSON.parse(RoomObject) : {}
  );
  console.log(RoomObject);

  const addToBooking = (item: string) => {
    console.log("Adding to basket:", item);
    console.log("Current basket:", BookedRoom);

    let newBasket;
    if (Object.keys(BookedRoom).includes(item)) {
      const currentQuantity =
        typeof BookedRoom[item] === "number" ? BookedRoom[item] : 0;
      newBasket = { ...BookedRoom, [item]: currentQuantity + 1 };
    } else {
      newBasket = { ...BookedRoom, [item]: 1 };
    }

    console.log("New basket:", newBasket);
    setBookedRoom(newBasket);
    localStorage.setItem("roomItems", JSON.stringify(newBasket));
  };

  const removeFromBooking = (item: string) => {
    if (Object.keys(BookedRoom).includes(item)) {
      let newBasket = { ...BookedRoom };
      if (BookedRoom[item] == 1) {
        delete newBasket[item];
      } else {
        newBasket = { ...BookedRoom, [item]: BookedRoom[item] - 1 };
      }
      setBookedRoom(newBasket);
      localStorage.setItem("roomItems", JSON.stringify(newBasket));
    }
  };

  const deleteFromBooking = (item: string) => {
    let newBasket = { ...BookedRoom };
    delete newBasket[item];
    setBookedRoom(newBasket);
    localStorage.setItem("BookedRoom", JSON.stringify(newBasket));
  };

  return { BookedRoom, addToBooking, removeFromBooking, deleteFromBooking };
}

export default useRooms;
