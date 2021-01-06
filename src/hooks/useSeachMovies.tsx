import { useState, useEffect } from 'react';
import axios from "axios";

const useSearchMovies = (query: string) => {
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<Array<MovieType>>([]);

  /**
   * Indicate if the result is being loaded
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Indicate if there are more pages for the current search term
   */
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const increasePageNumber = () => {
    if (results.length > 0) {
      setPageNumber(pageNumber + 1);
    }
  }

  /**
   * Set these to original every time query changes 
   */
  useEffect(() => {
    setResults([]);
    setPageNumber(1);
    setHasMore(true);
  }, [query])

  useEffect(() => {
    /**
     * Only start searching after the user stops typing for 500 milliseconds
     */
    let delayedSearch: NodeJS.Timeout;
     
    const trimmedQuery = query.trim();
    if (trimmedQuery !== "") {
      setError("");
      setLoading(true);
      delayedSearch = setTimeout(() => {
        axios.get(
          `https://www.omdbapi.com/?apikey=456ecb13&s=${query}&page=${pageNumber}`
        ).then(response => {
          if (response.data.Response === "False") {
            let message = response.data.Error;
            if (message === "Too many results.") {
              message += " Please provide more specific search term.";
            }
            if (pageNumber === 1) {
              setError(message);
            }
            setHasMore(false);
          } else {
            setResults(prevResults => [...prevResults, ...response.data.Search]);
          }
          setLoading(false);
        }).catch(error => {
          console.log(error);
        });
      }, 500);
    } else {
      setLoading(false);
    }

    return () => {
      clearTimeout(delayedSearch);
    }
  }, [pageNumber, query]);

  return {results, error, loading, hasMore, increasePageNumber};
}

export default useSearchMovies;