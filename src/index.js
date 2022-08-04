import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./Contexts/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./Pages/NewsPage/NewsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/posts/:postId" element={<NewsPage />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
