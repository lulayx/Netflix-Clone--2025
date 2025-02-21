import React, { useState, useEffect } from "react";
import axios from "../../Utils/axios"
import Requests from "../../Utils/Requests";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Banner.css";


function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    (async () => {
      try {
        // Fetch the movie
        const request = await axios.get(Requests.fetchNetflixOriginals);
        console.log(request);
        
        // Pick a random movie and set it to state..  The data will change everytime when refreshing it. 
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );

        // console.log(request);
      } catch (error) {
        // Catch errors if anything comes up.
        console.log(error);
      }
    })();
  }, []);

 
  function truncateText(text, maxLength) {
    return text?.length > maxLength
      ? text.substr(0, maxLength - 1) + "..."
      : text;
  }

  // console.log(movie);
  return (
    <>
      {/* Banner section image */}
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <h1 className="banner__description">
            {truncateText(movie?.overview, 150)}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button play mb-2">
              <PlayArrowIcon />
              Play
            </button>
            <button className="banner__button info ">
              <InfoOutlinedIcon /> My List
            </button>
          </div>
        </div>
        <div className="banner__fadeBottom" />
      </div>
    </>
  );
}

export default Banner;
