import './App.css';
import Container from './components/Container/Container';
import Appbar from './components/AppBar/AppBar';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePageView = lazy(() =>
  import(
    './views/HomePageView/HomePageView' /* webpackChunkName: "home-view" */
  ),
);

const MoviesPageView = lazy(() =>
  import(
    './views/MoviesPageView/MoviesPageView' /* webpackChunkName: "movie-view" */
  ),
);

const MovieDetailsPageView = lazy(() =>
  import(
    './views/MovieDetailsPageView/MovieDetailsPageView' /* webpackChunkName: "details-view" */
  ),
);

const NotFoundView = lazy(() =>
  import('./components/NotFound/NotFound' /* webpackChunkName: "not-found"*/),
);

export default function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePageView />
          </Route>

          <Route path="/movies" exact>
            <MoviesPageView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPageView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
