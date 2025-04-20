const express = require('express');
const cors    = require('cors');

const { Server } = require('boardgame.io/server');
const { TIBGame } = require('./Game');

const app = express();
app.use(cors());

const bg = Server({
  games: [TIBGame],
  origins: ['*'],
});
bg.app.use('/', app);

const PORT = process.env.PORT || 8000;
bg.run(PORT, () => {
  console.log(`🚀 TIB server listening on ${PORT}`);
});
