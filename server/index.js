// server/index.js
const express = require('express');
const cors = require('cors');
const { Server } = require('boardgame.io');   // pull Server from root
const { TIBGame } = require('./Game');

const app = express();
app.use(cors());

// Initialize boardgame.io server
const bg = Server({
  games: [TIBGame],
  origins: ['*'],
});

// Mount any custom routes (if needed)
bg.app.use('/', app);

// Listen on Render’s PORT or default to 8000
const PORT = process.env.PORT || 8000;
bg.run(PORT, () => {
  console.log(`🚀 TIB server listening on ${PORT}`);
});
