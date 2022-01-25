import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ films }) {
  const location = useLocation();
  //   const { url } = useRouteMatch();
  const [movies, setMovies] = useState();

  useEffect(() => {
    setMovies(films);
  }, []);

  return (
    <>
      <ul className={styles.ImageGallery}>
        {films &&
          films.map(({ title, id, poster_path }) => (
            <li key={id} className={styles.ImageGalleryItem}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className={styles.ImageGalleryItem_image}
                  //   title={title}
                />
                <p>{title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
