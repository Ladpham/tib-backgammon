import React from 'react';
import { Client } from 'boardgame.io/react';
import { LobbyClient } from 'boardgame.io/client';
import { TIBGame } from './Game';
import Board from './Board';

const tibClient = Client({
  game: TIBGame,
  board: Board,
  multiplayer: { server: process.env.REACT_APP_SERVER_URL },
});

export default function App() {
  const lobby = new LobbyClient({ server: process.env.REACT_APP_SERVER_URL });

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/logo.png" alt="TIB" height="60" />
      <h1>TIB – Un pion à la fois</h1>
      <lobby.Lobby
        gameServer={process.env.REACT_APP_SERVER_URL}
        lobbyServer={process.env.REACT_APP_SERVER_URL}
        gameMeta={[{ name: 'tib-backgammon' }]}
      />
      <tibClient />
    </div>
  );
}
