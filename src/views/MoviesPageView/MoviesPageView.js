import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as movieApi from '../../services/movie-api';
import MovieList from '../../components/MovieList/MovieList';
import Searchbar from '../../components/Searchbar/Searchbar';

export default function MoviesPageView() {
  const [querySearch, setQuerySearch] = useState('');
  const [filmsSearch, setFilmsSearch] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const storedSearchQuery =
    new URLSearchParams(location.search).get('querySearch') ?? '';

  useEffect(() => {
    if (!storedSearchQuery) {
      return;
    }
    movieApi
      .fetchMovieSearch(querySearch)
      .then(r => r.results)
      .then(setFilmsSearch);
  }, [storedSearchQuery]);

  const handleFormSubmit = findQuery => {
    if (querySearch === findQuery) {
      return;
    }
    setQuerySearch(findQuery);
    setFilmsSearch([]);
    history.push({ ...location, search: `querySearch=${findQuery}` });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {filmsSearch && <MovieList films={filmsSearch} />}
    </>
  );
}
