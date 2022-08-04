import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const BaseUrl = "http://hn.algolia.com/api/v1/";
  return (
    <AppContext.Provider value={{ searchResults, setSearchResults, BaseUrl }}>
      {children}
    </AppContext.Provider>
  );
};
