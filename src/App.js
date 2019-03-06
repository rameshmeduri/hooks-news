import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API = 'http://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    setLoading(true);

    axios
      .get(API + query)
      .then((res) => {
        setResults(res.data.hits);
      })
      .catch((err) => {
        setError(err);
      });

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map((obj) => (
            <li key={obj.objectID}>
              <a
                href={obj.url}
                className="text-indigo-dark hover:text-indigo-darkest"
              >
                {obj.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
};

export default App;
