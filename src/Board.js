import React from 'react';

export default function Board({ G, ctx, moves }) {
  return (
    <div>
      <h2>Match to {G.matchTarget} points</h2>
      <div className="dice-panel">
        <button onClick={() => moves.RollDice()}>Next Dice</button>
        {G.currentRoll && (
          <span> 🎲 {G.currentRoll[0]} & {G.currentRoll[1]}</span>
        )}
      </div>
      <div className="board">
        {G.board.points.map((count, idx) => (
          <div key={idx} style={{ width: 32, height: 32, border: '1px solid #333' }}>
            {count}
          </div>
        ))}
      </div>
      {/* For brevity: implement click-to-move or drag/drop here */}
    </div>
  );
}
