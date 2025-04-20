
import express from 'express';
import cors from 'cors';
import { Server } from 'boardgame.io/server';
import { TIBGame } from '../src/Game.js';  // ← note the “.js”
 
const app = express();
app.use(cors());
 
// boardgame.io server
const bgServer = Server({
  games: [TIBGame],
  origins: ['*'],   // allow GH Pages + any origin
});
 
// mount your own express routes (if any)
bgServer.app.use('/', app);
 
// listen on the port Render provides
const PORT = process.env.PORT || 8000;
bgServer.run(PORT, () => {
  console.log(`🚀 TIB server listening on ${PORT}`);
});
