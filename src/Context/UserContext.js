import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
