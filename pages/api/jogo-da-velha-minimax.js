// pages/api/jogo-da-velha.js

// Função para verificar se há um vencedor
const checkWinner = (board, player) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6],            // diagonais
    ];
    
    return winConditions.some((combo) =>
      combo.every((index) => board[index] === player)
    );
  };
  
  // Função Minimax para calcular a jogada do bot
  const minimax = (board, depth, isMaximizing) => {
    if (checkWinner(board, "O")) return { score: 10 - depth };
    if (checkWinner(board, "X")) return { score: depth - 10 };
    if (board.every((square) => square)) return { score: 0 }; // Empate
  
    const player = isMaximizing ? "O" : "X";
    const best = { score: isMaximizing ? -Infinity : Infinity };
  
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = player;
        const result = minimax(board, depth + 1, !isMaximizing);
        board[i] = null;
  
        if (isMaximizing ? result.score > best.score : result.score < best.score) {
          best.score = result.score;
          best.move = i;
        }
      }
    }
  
    return best;
  };
  
  // Função para obter a melhor jogada do bot
  const getBotMove = (board) => {
    const { move } = minimax(board, 0, true);
    return move;
  };
  
  export default function handler(req, res) {
  if (req.method === "POST") {
    const { board, index } = req.body;

    // Se index for -1, o bot começa o jogo
    if (index === -1) {
      const botMove = getBotMove(board);
      if (botMove !== -1) board[botMove] = "O";
      return res.status(200).json({ board, winner: checkWinner(board, "O") ? "Bot" : null });
    }

    // Jogada do usuário
    if (!board[index]) board[index] = "X";
    if (checkWinner(board, "X")) return res.status(200).json({ board, winner: "Jogador" });

    // Jogada do bot usando minimax
    const botMove = getBotMove(board);
    if (botMove !== -1) board[botMove] = "O";
    if (checkWinner(board, "O")) return res.status(200).json({ board, winner: "Bot" });

    // Responder sem ganhador
    return res.status(200).json({ board, winner: null });
  }

  // Reiniciar o jogo
  if (req.method === "DELETE") {
    return res.status(200).json({ board: Array(9).fill(null), winner: null });
  }

  res.status(405).end();
}
  