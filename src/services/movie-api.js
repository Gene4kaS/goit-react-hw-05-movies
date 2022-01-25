const BASE_URL = 'https://api.themoviedb.org/3';
const MY_KEY = 'b858cbc4a863372930e50a4f72c899cf';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMovieTrending(page) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/trending/movie/day?api_key=${MY_KEY}&page=${page}`,
  );
}

export function fetchMovieSearch(query, page = 1) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${MY_KEY}&query=${query}&page=${page}`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${MY_KEY}`,
  );
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${MY_KEY}`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${MY_KEY}`,
  );
}
