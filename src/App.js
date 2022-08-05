import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Contexts/AppContext";
import { getSearchApi } from "./APIs";
import axios from "axios";
import debounce from "./utils/debounce";
import getFormatedDates from "./utils/getFormatedDates";
import NewsCard from "./Components/NewsCard/NewsCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Homepage from "./Pages/Homepage/Homepage";
import NewsPage from "./Pages/NewsPage/NewsPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/posts/:postId" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
