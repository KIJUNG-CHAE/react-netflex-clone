import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 상영중인 영화들 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 id하나를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 틀정 영화의 더 상세한 정보를 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      // data를 movieDetail에 저장한다.
      params: { append_to_response: "videos" }, // 받아오는 응답에 비디오도 같이 달라
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">More Information</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
