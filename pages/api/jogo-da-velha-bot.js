// Em /pages/api/jogo-da-velha.js
let board = Array(9).fill(null);
let isXNext = true;

const checkWinner = (board, player) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player)
  );
};

const findBestMove = (board, botSymbol, playerSymbol) => {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = botSymbol;
      if (checkWinner(board, botSymbol)) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = playerSymbol;
      if (checkWinner(board, playerSymbol)) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }

  const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const index of preferredMoves) {
    if (!board[index]) return index;
  }
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    let { board, index } = req.body;
    board[index] = "X"; // Jogada do usuário

    if (checkWinner(board, "X")) {
      return res.status(200).json({ board, winner: "Jogador" });
    }

    const botMoveIndex = findBestMove(board, "O", "X");
    board[botMoveIndex] = "O"; // Jogada do bot

    if (checkWinner(board, "O")) {
      return res.status(200).json({ board, winner: "Bot" });
    }

    if (!board.includes(null)) {
      return res.status(200).json({ board, winner: "Empate" });
    }

    res.status(200).json({ board, winner: null });
  }

  if (req.method === 'DELETE'){
    board = Array(9).fill(null);
    isXNext = true;// Define que o jogador "X" joga primeiro
    return res.status(200).send();
  }

}
