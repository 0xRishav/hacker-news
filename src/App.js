import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import { AppContext } from "./Contexts/AppContext";
import { getSearchApi } from "./Contexts/APIs";
import axios from "axios";

function App() {
  const { searchResults, setSearchResults, BaseUrl } = useContext(AppContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchApi = getSearchApi(e.target.children[0].value);
      const res = await axios.get(searchApi);
      setSearchResults(res?.data?.hits);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header>
        <div>HackerNews</div>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search here..." />
        </form>
      </header>
      <div>
        {searchResults.map((hit) => (
          <>
            <h1>{hit.title}</h1>
            <div>{hit.author}</div>
            <div>{hit.created_at}</div>
            <div>{hit.points}</div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
