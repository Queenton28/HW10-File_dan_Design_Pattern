// repositories/movieRepository.js
const Movie = require('../models/movie');

class MovieRepository {
  async getAll() {
    return await Movie.findAll();
  }

  async getById(id) {
    return await Movie.findByPk(id);
  }

  async create(movieData) {
    return await Movie.create(movieData);
  }

  async update(id, movieData) {
    const movie = await Movie.findByPk(id);
    if (movie) {
      return await movie.update(movieData);
    }
    return null;
  }

  async delete(id) {
    const movie = await Movie.findByPk(id);
    if (movie) {
      return await movie.destroy();
    }
    return null;
  }
}

module.exports = new MovieRepository();