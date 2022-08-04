import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Contexts/AppContext";
import { getSearchApi } from "./APIs";
import axios from "axios";
import debounce from "./utils/debounce";
import getFormatedDates from "./utils/getFormatedDates";
import NewsCard from "./Components/NewsCard/NewsCard";

function App() {
  const { searchResults, setSearchResults, BaseUrl } = useContext(AppContext);
  const [sortByDate, setSortByDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* 
  With empty query also API fetches some results will be good for UX to show some news even if user has not searched
  */
  useEffect(() => {
    (async function () {
      let res = await axios.get(getSearchApi(""));
      setSearchResults(res?.data?.hits);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const searchApi = getSearchApi(searchQuery, sortByDate);
        const res = await axios.get(searchApi);
        setSearchResults(res?.data?.hits);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [sortByDate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchApi = getSearchApi(e.target.value, sortByDate);
      const res = await axios.get(searchApi);
      setSearchResults(res?.data?.hits);
      setSearchQuery(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = debounce(handleSearch, 400);

  return (
    <div className="App">
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
            onClick={() => {
              setSortByDate((prev) => !prev);
            }}
          />
          <div className="sort-text">Sort by date</div>
        </div>
      </header>
      <div>
        {searchResults.map((hit) => (
          <NewsCard {...hit} />
        ))}
      </div>
    </div>
  );
}

export default App;
