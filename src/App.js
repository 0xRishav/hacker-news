import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./Contexts/AppContext";
import { getSearchApi } from "./APIs";
import axios from "axios";
import debounce from "./utils/debounce";
import getFormatedDates from "./utils/getFormatedDates";
import NewsCard from "./Components/NewsCard";

function App() {
  const { searchResults, setSearchResults, BaseUrl } = useContext(AppContext);

  /* 
  With empty query also API fetches some results will be good for UX to show some news even if user has not searched
  */
  useEffect(() => {
    (async function () {
      let res = await axios.get(getSearchApi(""));
      setSearchResults(res?.data?.hits);
    })();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchApi = getSearchApi(e.target.value);
      const res = await axios.get(searchApi);
      setSearchResults(res?.data?.hits);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = debounce(handleSearch, 400);

  return (
    <div className="App">
      <header>
        <div>HackerNews</div>
        <form onChange={debouncedSearch}>
          <input type="text" placeholder="Search here..." />
        </form>
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
