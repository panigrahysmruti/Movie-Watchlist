const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  try {
    const { filter, search } = req.query;
    let query = {};
    
    if (filter === 'watched') {
      query.watched = true;
    } else if (filter === 'unwatched') {
      query.watched = false;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.title || req.body.title.trim().length === 0) {
    return res.status(400).json({ message: 'Movie title is required' });
  }
  
  const movie = new Movie({
    title: req.body.title.trim(),
    description: req.body.description || '',
    genre: req.body.genre || '',
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { watched, rating } = req.body;
    const updateData = { updatedAt: Date.now() };
    
    if (typeof watched === 'boolean') {
      updateData.watched = watched;
    }
    
    if (typeof rating === 'number' && rating >= 0 && rating <= 5) {
      updateData.rating = rating;
    }
    
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
