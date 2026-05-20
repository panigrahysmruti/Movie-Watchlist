import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '900px',
    margin: '0 auto 30px',
    padding: '20px 0',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#e94560',
  },
  homeBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #e94560',
    borderRadius: '25px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  statsContainer: {
    maxWidth: '900px',
    margin: '0 auto 30px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px 25px',
    borderRadius: '15px',
    minWidth: '100px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#e94560',
  },
  statLabel: {
    fontSize: '12px',
    color: '#a0a0a0',
    marginTop: '5px',
  },
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '25px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    backgroundColor: '#e94560',
    borderColor: '#e94560',
  },
  inputSection: {
    maxWidth: '900px',
    margin: '0 auto 40px',
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  searchInput: {
    padding: '15px 20px',
    width: '280px',
    borderRadius: '50px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
  },
  addInput: {
    padding: '15px 20px',
    width: '250px',
    borderRadius: '50px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
  },
  addBtn: {
    padding: '15px 30px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    maxWidth: '900px',
    margin: '0 auto',
  },
  movieCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 25px',
    marginBottom: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.2s',
    flexWrap: 'wrap',
    gap: '15px',
  },
  movieInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1,
    minWidth: '200px',
  },
  checkbox: {
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    accentColor: '#e94560',
  },
  movieTitle: {
    fontSize: '18px',
    fontWeight: '500',
  },
  movieTitleWatched: {
    textDecoration: 'line-through',
    opacity: 0.6,
  },
  ratingContainer: {
    display: 'flex',
    gap: '3px',
  },
  star: {
    fontSize: '18px',
    cursor: 'pointer',
    color: '#444',
    transition: 'color 0.2s',
  },
  starFilled: {
    color: '#ffc107',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  watchedBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#4ade80',
    border: '1px solid #4ade80',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  watchedBtnActive: {
    backgroundColor: '#4ade80',
    color: '#1a1a2e',
  },
  deleteBtn: {
    padding: '8px 16px',
    backgroundColor: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  empty: {
    textAlign: 'center',
    color: '#a0a0a0',
    fontSize: '18px',
    marginTop: '50px',
  },
  loading: {
    textAlign: 'center',
    color: '#a0a0a0',
    fontSize: '18px',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    color: '#ff4757',
    fontSize: '16px',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '20px auto',
  },
};

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [filter, searchQuery]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('filter', filter);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await axios.get(`${API_URL}?${params.toString()}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async () => {
    if (newMovie.trim()) {
      try {
        setError(null);
        const response = await axios.post(API_URL, { title: newMovie });
        setMovies([response.data, ...movies]);
        setNewMovie('');
      } catch (error) {
        console.error('Error adding movie:', error);
        setError('Failed to add movie. Please try again.');
      }
    }
  };

  const toggleWatched = async (movie) => {
    try {
      setError(null);
      const response = await axios.put(`${API_URL}/${movie._id}`, { 
        watched: !movie.watched 
      });
      setMovies(movies.map(m => m._id === movie._id ? response.data : m));
    } catch (error) {
      console.error('Error updating movie:', error);
      setError('Failed to update movie. Please try again.');
    }
  };

  const setRating = async (movie, rating) => {
    try {
      setError(null);
      const response = await axios.put(`${API_URL}/${movie._id}`, { rating });
      setMovies(movies.map(m => m._id === movie._id ? response.data : m));
    } catch (error) {
      console.error('Error updating rating:', error);
      setError('Failed to update rating. Please try again.');
    }
  };

  const removeMovie = async (id) => {
    try {
      setError(null);
      await axios.delete(`${API_URL}/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError('Failed to delete movie. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMovie();
    }
  };

  const watchedCount = movies.filter(m => m.watched).length;
  const unwatchedCount = movies.filter(m => !m.watched).length;
  const totalRating = movies.reduce((sum, m) => sum + (m.rating || 0), 0);
  const avgRating = movies.length > 0 ? (totalRating / movies.length).toFixed(1) : 0;

  const renderStars = (movie, forDisplay = false) => {
    return (
      <div style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...styles.star,
              ...(star <= (movie.rating || 0) ? styles.starFilled : {}),
            }}
            onClick={() => !forDisplay && setRating(movie, star === movie.rating ? 0 : star)}
          >
            {star <= (movie.rating || 0) ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Watchlist</h1>
        <Link to="/" style={styles.homeBtn}>Home</Link>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{movies.length}</div>
            <div style={styles.statLabel}>Total Movies</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{unwatchedCount}</div>
            <div style={styles.statLabel}>To Watch</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{watchedCount}</div>
            <div style={styles.statLabel}>Watched</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{avgRating}</div>
            <div style={styles.statLabel}>Avg Rating</div>
          </div>
        </div>
      </div>

      <div style={styles.filters}>
        {['all', 'unwatched', 'watched'].map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.inputSection}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          style={styles.searchInput}
        />
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a movie..."
          style={styles.addInput}
        />
        <button onClick={addMovie} style={styles.addBtn}>
          Add Movie
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div style={styles.loading}>Loading movies...</div>
      ) : (
        <ul style={styles.list}>
          {movies.map((movie) => (
            <li key={movie._id} style={styles.movieCard}>
              <div style={styles.movieInfo}>
                <input
                  type="checkbox"
                  checked={movie.watched}
                  onChange={() => toggleWatched(movie)}
                  style={styles.checkbox}
                />
                <div>
                  <span
                    style={{
                      ...styles.movieTitle,
                      ...(movie.watched ? styles.movieTitleWatched : {}),
                    }}
                  >
                    {movie.title}
                  </span>
                  {renderStars(movie)}
                </div>
              </div>
              <div style={styles.actions}>
                <button
                  onClick={() => toggleWatched(movie)}
                  style={{
                    ...styles.watchedBtn,
                    ...(movie.watched ? styles.watchedBtnActive : {}),
                  }}
                >
                  {movie.watched ? 'Watched' : 'Mark Watched'}
                </button>
                <button
                  onClick={() => removeMovie(movie._id)}
                  style={styles.deleteBtn}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {movies.length === 0 && !loading && (
        <div style={styles.empty}>
          <p>{searchQuery ? 'No movies found matching your search.' : 'No movies in your watchlist yet!'}</p>
          <p>{!searchQuery && 'Start adding some movies above'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
