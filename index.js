const express = require("express")
const app = express()

const { initializeDatabase } = require("./db/db.connect")
const Movie = require("./models/movie.models")

app.use(express.json())

initializeDatabase()

// For CORS Error
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const newMovie = {
//   title: "New Movie",
//   releaseYear: 2023,
//   genre: ["Drama"],
//   director: "Aditya Roy Chopra",
//   actors: ["Actor1, Actor2"],
//   language: "Hindi",
//   country: "India",
//   rating: 6.1,
//   plot: "A young man and woman fall in love of a Australian trip",
//   awards: "IFA Filmfare Awards",
//   posterUrl: "https://example.com/image1.jpg",
//   trailerUrl: "https://example.com/image2.jpg",
// }

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie)
    const saveMovie = await movie.save()
    return saveMovie
  } catch (error) {
    throw error
  }
}

app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body)
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: savedMovie })
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie" })
  }
})

// async function deleteMovie(movieId) {
//   try {
//     const deletedMovie = await Movie.findByIdAndDelete(movieId)
//     return deletedMovie
//   } catch (error) {
//     throw error
//   }
// }

// app.delete("/movies/:movieId", async (req, res) => {
//   try {
//     const deletedMovie = await deleteMovie(req.params.movieId)
//     res
//       .status(200)
//       .json({
//         error: "Movie deleted successfully.",
//         deletedMovie: deletedMovie,
//       })
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete movie. " })
//   }
// })

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
  try{
    const movie = await Movie.findOne ({title:movieTitle})
    return movie
  } catch (error) {
    throw error
  }
}

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title)
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ error: "Movie not found." })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch movie." })
  }
})

// get all the movies to the database
async function readAllMovies() {
  try {
    const allMovies = await Movie.find()
    return allMovies
  } catch (error) {
    throw error
  }`  `
}

app.get("/getMovies", async (req, res) => {
  try {
    const movies = await readAllMovies()
    if (movies.length !== 0) {
      res.json(movies)
    } else {
      res.status(404).json({ error: "no movie found." })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch movies." })
  }
})

// // read movies by director name
// async function readMovieByDirector(directorName) {
//   try{
//     const movieByDirector = await Movie.find({director:directorName})
//     return movieByDirector
//   } catch (error) {
//     throw error
//   }
// }

// app.get("/movies/director/:directorName", async (req, res) => {
//   try {
//     const movies = await readMovieByDirector(req.params.directorName)
//     if (movies.length !== 0) {
//       res.json(movies)
//     } else {
//       res.status(404).json({ error: "no movies found." })
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to Fetch movies." })
//   }
// })

// // read movies by genre
// async function readMovieByGenre(genreName) {
//   try {
//     const movieByGenre = await Movie.find({ genre: genreName })
//     return movieByGenre
//   } catch (error) {
//     throw error
//   }
// }

// app.get("/movies/genre/:genreName", async (req, res) => {
//   try {
//     const movies = await readMovieByGenre(req.params.genreName)
//     if (movies.length !== 0) {
//       res.json(movies)
//     } else {
//       res.status(404).json({ error: "no movies found." })
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to Fetch movies." })
//   }
// })

const PORT = 3000
app.listen(PORT, () => {
  console.log("Server is running on ", PORT)
})
