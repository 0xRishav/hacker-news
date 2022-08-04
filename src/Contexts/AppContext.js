import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <AppContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </AppContext.Provider>
  );
};
