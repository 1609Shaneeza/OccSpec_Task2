import { ReactNode, createContext } from "react";
import AccountCredentials, {
  CredentialContextType,
} from "./AccountCredentials";

export const AccountCredentialsContext =
  createContext<CredentialContextType | null>(null);

function CredentialProvider({ children }: { children: ReactNode }) {
  const accountCredentialContext = AccountCredentials();

  return (
    <AccountCredentialsContext.Provider value={accountCredentialContext}>
      {children}
    </AccountCredentialsContext.Provider>
  );
}

export default CredentialProvider;
