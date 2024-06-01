// controllers/userController.js
const userRepository = require('../repositories/userRepository');

class UserController {
  async getAll(req, res) {
    const users = await userRepository.getAll();
    res.json(users);
  }

  async getById(req, res) {
    const user = await userRepository.getById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async create(req, res) {
    const user = await userRepository.create(req.body);
    res.status(201).json(user);
  }

  async update(req, res) {
    const user = await userRepository.update(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async delete(req, res) {
    const result = await userRepository.delete(req.params.id);
    if (result) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}

module.exports = new UserController();