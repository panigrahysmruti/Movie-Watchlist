const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let inMemoryMovies = [];
let nextId = 1;

app.get('/api/movies', (req, res) => {
  let movies = [...inMemoryMovies];
  const { filter, search } = req.query;
  
  if (filter === 'watched') {
    movies = movies.filter(m => m.watched);
  } else if (filter === 'unwatched') {
    movies = movies.filter(m => !m.watched);
  }
  if (search) {
    movies = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
  }
  movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(movies);
});

app.post('/api/movies', (req, res) => {
  if (!req.body.title || !req.body.title.trim()) {
    return res.status(400).json({ message: 'Movie title is required' });
  }
  const movie = {
    _id: String(nextId++),
    title: req.body.title.trim(),
    description: req.body.description || '',
    genre: req.body.genre || '',
    watched: false,
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  inMemoryMovies.unshift(movie);
  res.status(201).json(movie);
});

app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = inMemoryMovies.findIndex(m => m._id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  if (typeof req.body.watched === 'boolean') {
    inMemoryMovies[movieIndex].watched = req.body.watched;
  }
  if (typeof req.body.rating === 'number' && req.body.rating >= 0 && req.body.rating <= 5) {
    inMemoryMovies[movieIndex].rating = req.body.rating;
  }
  inMemoryMovies[movieIndex].updatedAt = new Date();
  res.json(inMemoryMovies[movieIndex]);
});

app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = inMemoryMovies.findIndex(m => m._id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  inMemoryMovies.splice(movieIndex, 1);
  res.json({ message: 'Movie deleted' });
});

app.get('/', (req, res) => {
  res.send('Movie Watchlist API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
