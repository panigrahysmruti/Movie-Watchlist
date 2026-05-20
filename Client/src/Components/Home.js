import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    padding: '20px',
  },
  logo: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #e94560, #ff6b6b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '20px',
    color: '#a0a0a0',
    marginBottom: '40px',
    maxWidth: '500px',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    padding: '15px 40px',
    fontSize: '18px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(233, 69, 96, 0.4)',
  },
  secondaryBtn: {
    padding: '15px 40px',
    fontSize: '18px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #e94560',
    borderRadius: '50px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'transform 0.2s, backgroundColor 0.2s',
  },
  features: {
    display: 'flex',
    gap: '30px',
    marginTop: '60px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  feature: {
    textAlign: 'center',
    maxWidth: '200px',
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#a0a0a0',
  },
};

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.logo}>🎬</div>
      <h1 style={styles.title}>Movie Watchlist</h1>
      <p style={styles.subtitle}>
        Track your favorite movies, create personalized lists, and never miss what to watch next.
      </p>
      
      <div style={styles.buttons}>
        <Link to="/watchlist" style={styles.primaryBtn}>
          Get Started
        </Link>
        <button style={styles.secondaryBtn} onClick={() => alert('Coming soon!')}>
          Learn More
        </button>
      </div>

      <div style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>📚</div>
          <div style={styles.featureTitle}>Organize</div>
          <div style={styles.featureDesc}>Keep all your movies in one place</div>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>⭐</div>
          <div style={styles.featureTitle}>Rate</div>
          <div style={styles.featureDesc}>Rate movies you've watched</div>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🎯</div>
          <div style={styles.featureTitle}>Track</div>
          <div style={styles.featureDesc}>Mark movies as watched or pending</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
