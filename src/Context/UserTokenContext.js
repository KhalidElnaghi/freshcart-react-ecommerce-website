import { createContext, useState } from "react";

export let UserTokenContext = createContext();

export default function UserTokenContextProvider({ children }) {
  let [userToken, setUserToken] = useState("");
  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
}
