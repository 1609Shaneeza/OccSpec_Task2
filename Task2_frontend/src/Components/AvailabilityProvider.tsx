import { ReactNode, createContext } from "react";
import AvailabilityCheck, { CheckContextType } from "./CheckAvailability";



export const CheckAvailabilityContext = createContext<CheckContextType | null>(null);


function AvailabilityProvider({children}:{children:ReactNode}) {

    const CheckDetailsContext = AvailabilityCheck();

    return (
        <CheckAvailabilityContext.Provider value={CheckDetailsContext}>
            {children}
        </CheckAvailabilityContext.Provider>
    )
}

export default AvailabilityProvider;