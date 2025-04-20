// server/index.js

const express = require('express');
const cors    = require('cors');
const bgio    = require('boardgame.io');
const { TIBGame } = require('./Game');

const { Server } = bgio.server;   // pull the server API

const app = express();
app.use(cors());

// Instantiate the boardgame.io server
const bg = Server({
  games: [TIBGame],
  origins: ['*'], // allow GH‑Pages client
});

bg.app.use('/', app);

// All done—listen on RENDER's port
const PORT = process.env.PORT || 8000;
bg.run(PORT, () => {
  console.log(`🚀 TIB server listening on ${PORT}`);
});
