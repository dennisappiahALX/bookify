export const genres = [
    // { _id: "1", name: "All Genres" },
    { _id: "5b21ca3eeb767fhccd471818", name: "Action" },
  
    { _id: "5b21ca3eeb767fhccd471819", name: "Romance" },
    { _id: "5b21ca3eeb767fhccd471820", name: "Adventure" },
    { _id: "5b21ca3eeb767fhccd471821", name: "Thriller" },
    { _id: "5b21ca3eeb767fhccd471822", name: "Comedy" }
  ];
  
  export function getGenres() {
    return genres.filter(g => g);
  }