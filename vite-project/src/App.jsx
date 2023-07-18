import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Header from "./components/Header";
import Movie from "./components/Movie";

// My Api key doesn't work for some reason

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eac540a91amshbe3479cf5b4a6acp1b49f1jsnd24d134e24bf",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "true") {
          setMovies(data.Search);
          setLoading(false);
        } else {
          setErrorMessage(data.Error);
          setLoading(false);
        }
        console.log(data);
        setFilms(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search == "true") {
          setMovies(data.Search);
          setLoading(false);
        } else {
          setErrorMessage(data.Error);
          setLoading(false);
        }
      });
  };
  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
