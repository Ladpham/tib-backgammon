import { Game, TurnOrder, INVALID_MOVE } from 'boardgame.io/dist/esm/core/index.js';


// Simplified Backgammon logic (stubbed)
const Engine = {
  initialBoard() {
    return {
      points: Array(24).fill(0),
      bar:    { p1: 0, p2: 0 },
      off:    { p1: 0, p2: 0 },
    };
  },
  generateDiceSeries() {
    return Array.from({ length: 5 }, () => [
      1 + Math.floor(Math.random() * 6),
      1 + Math.floor(Math.random() * 6),
    ]);
  },
  isValidMove(G, player, from, to) {
    return true; // Implement real rules
  },
  applyMove(G, player, from, to) {
    // TODO: mutate G.board
  },
  computeMetrics(history, rolls) {
    const total = history.length;
    const pr    = total ? (100 * total) / total : 0;
    const flat  = rolls.flat();
    const sum   = flat.reduce((a, b) => a + b, 0);
    const n     = flat.length;
    const luck  = n ? (100 * (sum - 3.5 * n)) / (2 * Math.sqrt(n)) : 0;
    return { pr: pr.toFixed(1), luck: luck.toFixed(1) };
  },
};

export const TIBGame = Game({
  name: 'tib-backgammon',
  setup: () => ({
    board:       Engine.initialBoard(),
    rolls:       Engine.generateDiceSeries(),
    history:     [],
    currentRoll: null,
    matchTarget: 5,
  }),
  turn: { order: TurnOrder.DEFAULT },
  moves: {
    RollDice: {
      move: ({ G, ctx }) => {
        if (ctx.playOrderPos.toString() !== ctx.playerID) return INVALID_MOVE;
        G.currentRoll = G.rolls[ctx.turn];
      },
    },
    MoveChecker: {
      move: ({ G, ctx }, from, to) => {
        const player = ctx.playerID === '0' ? 'p1' : 'p2';
        if (!Engine.isValidMove(G, player, from, to)) return INVALID_MOVE;
        Engine.applyMove(G, player, from, to);
        G.history.push({ player, from, to });
      },
    },
  },
  endIf: ({ G }) => {
    const { off } = G.board;
    if (off.p1 >= G.matchTarget) return { winner: 'p1' };
    if (off.p2 >= G.matchTarget) return { winner: 'p2' };
  },
  onEnd: ({ G, result }) => {
    const { pr, luck } = Engine.computeMetrics(G.history, G.rolls);
    alert(`🏆 Winner: ${result.winner}\n💯 PR: ${pr}\n🎲 Luck: ${luck}`);
  },
});
