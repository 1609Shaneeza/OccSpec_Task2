import { useState } from "react";

const ACCOUNT_CREDENTIALS = "account-credentials";

interface CredentialsType {
  Email: string;
  Password: string;
}

export interface CredentialContextType {
  accountDetails: CredentialsType | null;
  setAccountDetails: (newCredentials: CredentialsType) => void;
}

function AccountCredentials(): CredentialContextType {
  const credentialsString = sessionStorage.getItem(ACCOUNT_CREDENTIALS);
  const credentialsObject = credentialsString
    ? JSON.parse(credentialsString)
    : null;

  const [accountDetails, setAccountDetails] = useState(credentialsObject);

  const saveAccountCredentials = (newCredentials: CredentialsType) => {
    sessionStorage.setItem(ACCOUNT_CREDENTIALS, JSON.stringify(newCredentials));
    setAccountDetails(newCredentials);
  };

  return { accountDetails, setAccountDetails: saveAccountCredentials };
}

export default AccountCredentials;
