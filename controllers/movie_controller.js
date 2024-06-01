// controllers/movieController.js
const movieRepository = require('../repositories/movieRepository');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

class MovieController {
  async getAll(req, res) {
    const movies = await movieRepository.getAll();
    res.json(movies);
  }

  async getById(req, res) {
    const movie = await movieRepository.getById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  }

  async create(req, res) {
    const movieData = req.body;
    if (req.file) {
      movieData.photo = req.file.path;
    }
    const movie = await movieRepository.create(movieData);
    res.status(201).json(movie);
  }

  async update(req, res) {
    const movieData = req.body;
    if (req.file) {
      movieData.photo = req.file.path;
    }
    const movie = await movieRepository.update(req.params.id, movieData);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  }

  async delete(req, res) {
    const result = await movieRepository.delete(req.params.id);
    if (result) {
      res.json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  }
}

module.exports = new MovieController();