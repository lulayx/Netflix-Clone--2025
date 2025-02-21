import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../Utils/axios";
import movieTrailer from "movie-trailer" // downloaded npm i movie-trailer from terminal
import YouTube from 'react-youtube';  // downloaded npm react-youtube from termanal 

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovie] = useState([]);
  const [
    trailerUrl, ///this is to manage the state of which trailer is currently playing and which row is actively uploaded.
    setTrailerUrl,
  ] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        // console.log(fetchUrl)
        const request = await axios.get(fetchUrl);
        // console.log(request)
        setMovie(request.data.results);
      } catch (error) {
        // error handling method to catch if error occurs in between. 
        console.log("error", error);
      }
    })();
  }, [fetchUrl]); // dependency array to render new items by using to re-run useEffect listed above. 
  // console.log(movies)

  // This function (HANDLECLICK) helps when users click on a movie (just one movie), that will generated data amd it will helps to make it response actively. if the trailer is exist, it will put empty but if not, it will bring the title and put the video at the same time. 
  const handleClick = (movie) => {
    if (trailerUrl) {
      // If a trailer is already playing and clicked again, close and move to the next one
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          // console.log(url)
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (      //1.  The title comes from props  which "Netflix Originals". 2. we use key index to map out for each movie from the source. 
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name} // This will give us the name of the hoovered data (movie)
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}//
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
