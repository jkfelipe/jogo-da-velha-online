let board = Array(9).fill(null);
let isXNext = true;

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { index } = req.body;

    if (board[index] || calculateWinner(board)) {
      return res.status(400).json({ error: "Invalid move" });
    }

    board[index] = isXNext ? 'X' : 'O';
    isXNext = !isXNext;

    const winner = calculateWinner(board);
    return res.status(200).json({ board, winner });
  }

  if (req.method === 'DELETE'){
      board = Array(9).fill(null);
      isXNext = true;// Define que o jogador "X" joga primeiro
      return res.status(200).send();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ board, isXNext });
  }

  res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
