const http = require('http');

const movies = [
  'The Shawshank Redemption',
  'Inception',
  'The Dark Knight',
  'Pulp Fiction',
  'Forrest Gump',
  'The Matrix',
  'Interstellar',
  'Parasite',
  'Whiplash',
  'The Godfather'
];

function addMovie(title) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ title });
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/movies',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Added: ${title}`);
        resolve(JSON.parse(body));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('Adding movies to watchlist...\n');
  for (const movie of movies) {
    try {
      await addMovie(movie);
    } catch (e) {
      console.error(`Error adding ${movie}:`, e.message);
    }
  }
  console.log('\nDone! Added 10 movies.');
}

main();
