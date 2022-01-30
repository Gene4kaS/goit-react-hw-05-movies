import React, { useState, useEffect } from 'react';
import s from './Cast.module.css';
import * as movieApi from '../../services/movie-api';
import { useParams } from 'react-router-dom';
import noPhoto from '../icons/nophoto.jpg';

export default function Cast() {
  const { movieId } = useParams;
  const { cast, setCast } = useState([]);

  useEffect(() => {
    movieApi.fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div>
      <ul className={s.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={s.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : noPhoto
              }
              alt={actor.name}
              width="100"
            />
            <div>
              <p className={s.actorName}>{actor.name}</p>
              <p className={s.actorName}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default function CastView() {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState([]);

//   useEffect(() => {
//     movieApi.fetchMovieCast(movieId).then(({ cast }) => {
//       if (cast.length) {
//         setCast(cast);
//         return;
//       }
//       setCast([]);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className={s.cast}>
//       <ul className={s.castList}>
//         {cast.length > 0 ? (
//           cast.map(actor => (
//             <li key={actor.id} className={s.castItem}>
//               <img
//                 src={
//                   actor.profile_path
//                     ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
//                     : noPhoto
//                 }
//                 alt={actor.name}
//                 width="130"
//               />
//               <div className={s.textInfo}>
//                 <p className={s.actorName}>{actor.name}</p>
//                 <p className={s.actorCharacter}>{actor.character}</p>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className={s.noInfo}>Nothing about cast:(.</p>
//         )}
//       </ul>
//     </div>
//   );
// }
