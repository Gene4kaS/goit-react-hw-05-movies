import './App.css';
import Container from './components/Container/Container';
import Appbar from './components/AppBar/AppBar';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

const HomePageView = lazy(() =>
  import(
    './views/HomePageView/HomePageView' /* webpackChunkName: "home-view" */
  ),
);

export default function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Route path="/" exact>
          <HomePageView />
        </Route>
      </Suspense>
    </Container>
  );
}
