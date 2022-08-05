import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getSearchApi } from "../../APIs";
import Loader from "../../Components/Loader/Loader";
import NewsCard from "../../Components/NewsCard/NewsCard";
import { AppContext } from "../../Contexts/AppContext";
import debounce from "../../utils/debounce";
import "./Homepage.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EmptyStateMessage from "../../Components/EmptyStateMessage/EmptyStateMessage";

function Homepage() {
  const { searchResults, setSearchResults, isLoading, setLoading, showToast } =
    useContext(AppContext);
  const [sortByDate, setSortByDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* 
    With empty query also API fetches some results will be good for UX to show some news even if user has not searched
    */

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const searchApi = getSearchApi(searchQuery, sortByDate);
        const res = await axios.get(searchApi);
        setSearchResults(res?.data?.hits);
      } catch (err) {
        showToast("error", err.message);
      }
      setLoading(false);
    })();
  }, [sortByDate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchApi = getSearchApi(e.target.value, sortByDate);
      const res = await axios.get(searchApi);
      if (res.status === 200) {
        setSearchResults(res?.data?.hits);
        setSearchQuery(e.target.value);
      }
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const debouncedSearch = debounce(handleSearch, 400);

  return isLoading ? (
    <>
      <div className="loader-wrapper">
        <Loader />
      </div>
    </>
  ) : (
    <>
      <div className="Homepage">
        <header className="homepage-header">
          <div className="logo">HackerNews</div>
          <form onChange={debouncedSearch} className="search-form">
            <input
              className="search-box"
              type="text"
              placeholder="Search here..."
            />
          </form>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={sortByDate}
              className="sort-checkbox"
              value={searchQuery}
              onClick={() => {
                setSortByDate((prev) => !prev);
              }}
            />
            <div className="sort-text">Sort by date</div>
          </div>
        </header>
        <div>
          {searchResults.length > 0 ? (
            searchResults.map((hit) => (
              <NewsCard key={hit?.objectID} {...hit} />
            ))
          ) : (
            <EmptyStateMessage message="Search results not found." />
          )}
        </div>
      </div>
    </>
  );
}

export default Homepage;
