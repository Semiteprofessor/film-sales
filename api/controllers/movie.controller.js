const MovieModel = require("../models/movie.model");
const createMovie = async (req, res) => {
  try {
    const { title, release_date, director, genre, description, image_url } =
      req.body;
    const checkIfMovieExist = MovieModel.findAll({
      where: { title },
    });
    if (checkIfMovieExist.length > 0) {
      res.status(400).json({
        message: "Movie already exists",
      });
      return;
    }

    await MovieModel.create({
      title,
      release_date,
      director,
      genre,
      description,
      image_url,
    });
    res
      .status(201)
      .json({ status: true, message: "Movie created successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Error creating movie", error });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await MovieModel.findAll();
    res.status(200).json({ status: true, movies });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ status: true, movie });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.update(req.body);
    res
      .status(200)
      .json({ status: true, message: "Movie updated successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.destroy();
    res
      .status(200)
      .json({ status: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
