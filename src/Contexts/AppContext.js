import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const BaseUrl = "http://hn.algolia.com/api/v1/";
  const showToast = (type, message) => {
    switch (type) {
      case type === "success": {
        return toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      case type === "error": {
        return toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  return (
    <AppContext.Provider
      value={{
        searchResults,
        setSearchResults,
        BaseUrl,
        isLoading,
        setLoading,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
