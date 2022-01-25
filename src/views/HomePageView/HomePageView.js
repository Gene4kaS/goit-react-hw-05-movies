import React, { useState, useEffect } from 'react';
import { fetchMovieTrending } from '../../services/movie-api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePageView.module.css';

export default function HomePageView() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchMovieTrending().then(setFilms);
  }, []);

  return (
    <>{films && <MovieList films={films} title="Popular movies are:" />}</>
  );
}
