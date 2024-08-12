const express = require("express");
const router = express.Router();

const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

// ADD NEW MOVIE ROUTE
router.post("/add", createMovie);

// GET ALL MOVIES ROUTE
router.get("/", getMovies);

// GET SINGLE MOVIE ROUTE
router.get("/:id", getMovieById);

// UPDATE MOVIE ROUTE
router.patch("/:id", updateMovie);

// DELETE MOVIE ROUTE
router.delete("/delete/:id", deleteMovie);

module.exports = router;
