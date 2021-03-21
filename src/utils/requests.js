const API_KEY = '1600a1537d3dc82d8380daca3e0786a0';
const requests = {
    fetchTrending : `/trending/all/week?api_key=${API_KEY}&language=en=us`,
    fetchNetflixOriginals : `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=en=us`,
    fetchActionMovies : `/discover/movie?api_key=${API_KEY}&with_generes=28`,
    fetchMovieById: (movieId)=>{
      return  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    }

  }
const base_url = "https://image.tmdb.org/t/p/original";

module.exports = {
    API_KEY,
    requests,
    base_url
}