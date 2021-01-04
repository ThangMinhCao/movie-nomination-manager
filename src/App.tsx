import * as React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import "./App.scss";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [results, setResults] = useState<Array<MovieType>>([]);
  const [nominations, setNominations] = useState<Array<MovieType>>([]);

  useEffect(() => {
    /**
     * Call the API to search for title every time "searchTerm" change
     */
    const searchMovie = async (searchTerm: string) => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=456ecb13&s=${searchTerm}`
        );
        if (response.data.Response === "False") {
          let message = response.data.Error;
          if (message === "Too many results.") {
            message += " Please provide more specific search term.";
          }
          setSearchError(message);
        } else {
          setResults(response.data.Search);
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    };

    /**
     * Only start searching after the user stops typing for 800 milliseconds
     */
    const delayedSearch = setTimeout(() => {
      setSearchError("");
      setResults([]);
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm !== "") {
        searchMovie(searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(delayedSearch);
    }
  }, [searchTerm]);

  /**
   * Check and get data from localStorage (if available)
   */
  useEffect(() => {
    const localData = localStorage.getItem("nominations");
    if (localData && JSON.parse(localData)) {
      setNominations(JSON.parse(localData));
    }
  }, []);

  /**
   * Add a event listener to save nominations to localStorage before unmount
   */
  useEffect(() => {
    const saveToLocal = () => {
      localStorage.setItem("nominations", JSON.stringify(nominations));
    };
    window.addEventListener("beforeunload", saveToLocal);

    return () => {
      window.removeEventListener("beforeunload", saveToLocal);
    };
  }, [nominations]);

  /**
   * Check if 2 movie objects are equals
   * @param movie1
   * @param movie2
   */
  const isEquals = (movie1: MovieType, movie2: MovieType): boolean => {
    return (
      movie1.Title === movie2.Title &&
      movie1.Year === movie2.Year &&
      movie1.Poster === movie2.Poster &&
      movie1.imdbID === movie2.imdbID
    );
  };

  /**
   * Add "movie" to the nomination list
   * @param movie
   */
  const addNomination = (movie: MovieType): void => {
    if (nominations.length >= 5) {
      console.log("Your nomination list is full.");
      return;
    } else if (isNominated(movie)) {
      console.log("The given movie is already nominated.");
      return;
    }
    setNominations([...nominations, movie]);
  };

  /**
   * Remove "movie" out of the nomination list
   * @param movie
   */
  const removeNomination = (movie: MovieType): void => {
    if (!isNominated(movie)) {
      console.log("The given movie is not in the nomination list");
      return;
    }
    setNominations(nominations.filter((item) => !isEquals(item, movie)));
  };

  const clearNominationList = (): void => {
    setNominations([]);
  }

  /**
   * Check if "movie" is nominated or not
   * @param movie
   */
  const isNominated = (movie: MovieType): boolean => {
    for (let i = 0; i < nominations.length; i++) {
      if (isEquals(nominations[i], movie)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="components-container">
      <div className="page-header">
        <SearchBar
          error={searchError}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          ready={nominations.length === 5}
        />
        <div className="page-title">
          The Shoppies
          <div className="subtitle">Movie Awards For Entrepreneurs</div>
        </div>
      </div>
      <MovieList
        isNominated={isNominated}
        nominate={addNomination}
        removeNomination={removeNomination}
        clearNominations={clearNominationList}
        title="Results"
        movies={results}
        hidden={nominations.length === 5}
      />
      <MovieList
        isNominated={isNominated}
        nominate={addNomination}
        removeNomination={removeNomination}
        clearNominations={clearNominationList}
        title="Nominations"
        showElementsNumber
        movies={nominations}
      />
    </div>
  );
};

export default App;
