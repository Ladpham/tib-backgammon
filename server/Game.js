const { Game, TurnOrder, INVALID_MOVE } = require('boardgame.io/core');

const Engine = {
  initialBoard() { /* … */ },
  generateDiceSeries() { /* … */ },
  isValidMove(G, player, from, to) { return true; },
  applyMove(G, player, from, to) { /* … */ },
  computeMetrics(history, rolls) { /* … */ return { pr, luck }; },
};

const TIBGame = Game({
  name: 'tib-backgammon',
  setup: () => ({
    board: Engine.initialBoard(),
    rolls: Engine.generateDiceSeries(),
    history: [],
    currentRoll: null,
    matchTarget: 5,
  }),
  turn: { order: TurnOrder.DEFAULT },
  moves: {
    RollDice: { /* … */ },
    MoveChecker: { /* … */ },
  },
  endIf: ({ G }) => { /* … */ },
  onEnd: ({ G, result }) => { /* … */ },
});

module.exports = { TIBGame };
