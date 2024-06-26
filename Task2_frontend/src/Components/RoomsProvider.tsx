import { ReactNode, createContext } from "react";
import useRooms, { RoomContextType } from "./useRooms";

export const BookedRoomContext = createContext<RoomContextType | null>(null);

function BookedRoomsProvider({ children }: { children: ReactNode }) {
  const basketItemsContext = useRooms();
  console.log(basketItemsContext.BookedRoom);

  return (
    <BookedRoomContext.Provider value={basketItemsContext}>
      {children}
    </BookedRoomContext.Provider>
  );
}

export default BookedRoomsProvider;
