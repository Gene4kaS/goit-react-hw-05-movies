import React, { useState, useEffect } from 'react';
import * as movieApi from '../../services/movie-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePageView() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    return movieApi
      .fetchMovieTrending()
      .then(r => r.results)
      .then(setFilms);
  }, []);

  return (
    <>{films && <MovieList films={films} title="Popular movies are:" />}</>
  );
}
