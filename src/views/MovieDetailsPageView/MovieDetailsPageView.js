import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as movieApi from '../../services/movie-api';
import s from './MovieDetailsPageView.module.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "cast-view"*/),
);

const Reviews = lazy(() =>
  import(
    '../../components/Reviews/Reviews' /* webpackChunkName: "reviews-view"*/
  ),
);

export default function MovieDetailsPageView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    movieApi.fetchMovieDetails(movieId).then(movie => setMovie(movie));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack} className={s.goBackButton}>
            Go back
          </button>
          <div className={s.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={s.image}
            />
            <div>
              <p className={s.title}>{movie.title}</p>
              <div className={s.genres}>
                <span className={s.text}>Genres: </span>
                {movie.genres.map(genre => (
                  <span key={genre.id} className={s.genreName}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className={s.text}>Rate: {movie.vote_average}</p>
              <p className={s.text}>Runtime: {movie.runtime} min.</p>
              <p className={s.text}>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Switch>
          <Route index path={`${path}/cast`}>
            {movie && <Cast />}
          </Route>
          <Route index path={`${path}/reviews`}>
            {movie && <Reviews />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
