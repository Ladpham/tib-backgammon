import express from 'express';
import cors    from 'cors';
import { Server } from 'boardgame.io/server';
import { TIBGame } from '../src/Game.js';  // your ESM Game definition

const app = express();
app.use(cors());

// boardgame.io ESM server entrypoint
const bg = Server({
  games: [TIBGame],
  origins: ['*'],     // allow connections from anywhere (GH Pages)
});

// Mount your own routes (if any)
bg.app.use('/', app);

// Render provides PORT automatically
const PORT = process.env.PORT || 8000;
bg.run(PORT, () => {
  console.log(`🚀 TIB server listening on ${PORT}`);
});
