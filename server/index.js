const express = require('express');
const cors = require('cors');
const { Server } = require('boardgame.io/server');
const path = require('path');
const { TIBGame } = require('../src/Game'); // adjust if your path is different

// Create a tiny Express app for any custom routes (optional)
const app = express();
app.use(cors());

// Initialize Boardgame.io server with your game
const bgServer = Server({
  games: [TIBGame],
  // Allow any origin to connect (for GH Pages + Render)
  origins: ['*'],
});

// Mount the Express app onto the Boardgame.io server
bgServer.app.use('/', app);

// Listen on the port Render assigns (process.env.PORT) or fallback to 8000
const PORT = process.env.PORT || 8000;
bgServer.run(PORT, () => {
  console.log(`🚀 TIB Backgammon server listening on port ${PORT}`);
});
