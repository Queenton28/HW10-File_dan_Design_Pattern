// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', movieController.getAll);
router.get('/:id', movieController.getById);
router.post('/', upload.single('photo'), movieController.create);
router.put('/:id', upload.single('photo'), movieController.update);
router.delete('/:id', movieController.delete);

module.exports = router;