import React from 'react';

export default function Board({ G, ctx, moves }) {
  return (
    <div>
      <h2>Match to {G.matchTarget} points</h2>
      <div className="dice-panel">
        <button onClick={() => moves.RollDice()}>Next Dice</button>
        {G.currentRoll && (
          <span> 🎲 {G.currentRoll[0]} &amp; {G.currentRoll[1]}</span>
        )}
      </div>
      <div className="board" style={{ display: 'flex', flexWrap: 'wrap', width: 400, margin: 'auto' }}>
        {G.board.points.map((count, idx) => (
          <div key={idx}
               style={{
                 width: 30, height: 30, border: '1px solid #333',
                 display: 'flex', alignItems: 'center', justifyContent: 'center'
               }}>
            {count}
          </div>
        ))}
      </div>
      {/* Add click‑to‑move or drag/drop logic here */}
    </div>
  );
}
