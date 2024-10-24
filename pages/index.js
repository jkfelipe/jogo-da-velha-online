import { useState } from 'react';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(board)) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

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

  const winner = calculateWinner(board);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div>
        <h1 className="text-white text-center text-2xl mb-6">Jogo da Velha</h1>
        <div className="grid grid-cols-3 gap-4">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 flex justify-center items-center bg-transparent border-4 border-purple-500 hover:bg-gray-800 cursor-pointer"
            >
              <span className="text-5xl text-white">{value}</span>
            </div>
          ))}
        </div>
        {winner && <p className="text-white text-center mt-6">{winner} venceu!</p>}
      </div>
    </div>
  );
}
