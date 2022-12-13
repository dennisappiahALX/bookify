import * as genresAPI from "./fakeCategoryService";


const movies = [
    {
        _id: "5b21ca3eeb767fhccd471815",
        title : "Terminator",
        category : {_id:"5b21ca3eeb767fhccd471818", name: "Action" },
        numberInStock: 5,
        dailyRentalRate : 2.5,
        liked: true
    }, 
    {
        _id: "5b21ca3eeb767fhccd471816",
        title : "Avatar",
        category : {_id:"5b21ca3eeb767fhccd471818", name: "Action" },
        numberInStock: 6,
        dailyRentalRate : 10
    },
    {
        _id: "5b21ca3eeb767fhccd471817",
        title : "Woman Steel",
        category : {_id:"5b21ca3eeb767fhccd471819", name: "Romance" },
        numberInStock: 7,
        dailyRentalRate : 15
    },
    {
        _id: "5b21ca3eeb767fhccd471818",
        title : "Selfish Love",
        category : {_id:"5b21ca3eeb767fhccd471819", name: "Romance" },
        numberInStock: 8,
        dailyRentalRate : 16
    },
    {
        _id: "5b21ca3eeb767fhccd471819",
        title : "Televista",
        category : {_id:"5b21ca3eeb767fhccd471820", name: "Adventure" },
        numberInStock: 9,
        dailyRentalRate : 17
    },
    {
        _id: "5b21ca3eeb767fhccd471820",
        title : "Hello World",
        category : {_id:"5b21ca3eeb767fhccd471820", name: "Adventure" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471821",
        title : "World Season",
        category : {_id:"5b21ca3eeb767fhccd471821", name: "Thriller" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471822",
        title : "Amazon",
        category : {_id:"5b21ca3eeb767fhccd471822", name: "Comedy" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471823",
        title : "Amazon Crashers",
        category : {_id:"5b21ca3eeb767fhccd471822", name: "Comedy" },
        numberInStock: 15,
        dailyRentalRate : 20
    },

]


export function getMovies() {
    return movies;
}

export function getMovie(id) {
    return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
    let movieInDb = movies.find(m => m._id === movie._id) || {};
    movieInDb.title = movie.title;
    movieInDb.category = genresAPI.genres.find(g => g._id === movie.genreId);
    movieInDb.numberInStock = movie.numberInStock;
    movieInDb.dailyRentalRate = movie.dailyRentalRate;
  
    if (!movieInDb._id) {
      movieInDb._id = Date.now().toString()
      movies.push(movieInDb);
    }
  
    return movieInDb;
  }
  
  export function deleteMovie(id) {
    let movieInDb = movies.find(m => m._id === id);
    movies.splice(movies.indexOf(movieInDb), 1);
    return movieInDb;
  }