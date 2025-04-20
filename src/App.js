import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { P2P, generateCredentials } from '@boardgame.io/p2p';
import { TIBGame } from './Game';
import Board       from './Board';

export default function App() {
  const [matchID, setMatchID]     = useState('');
  const [isHost, setIsHost]       = useState(false);
  const [credentials]             = useState(() => generateCredentials());

  // Only instantiate after matchID is set
  const GameClient = Client({
    game:       TIBGame,
    board:      Board,
    multiplayer: P2P({ isHost, credentials }),
    numPlayers: 2,
    playerID:   isHost ? '0' : '1',
    matchID,
    credentials,
  });

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <img src="/logo.png" alt="TIB logo" height="60" />
      <h1>TIB – Un pion à la fois</h1>

      {!matchID && (
        <div>
          <button
            onClick={() => {
              setIsHost(true);
              setMatchID(Date.now().toString());
            }}
          >
            Host a Game
          </button>
          <br /><br />
          <input
            type="text"
            placeholder="Enter Match ID"
            value={matchID}
            onChange={e => setMatchID(e.target.value)}
          />
          <button onClick={() => setIsHost(false)}>
            Join Game
          </button>
        </div>
      )}

      {matchID && <GameClient />}
    </div>
  );
}
