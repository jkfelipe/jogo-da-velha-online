import { useEffect, useState } from 'react';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  
  const fetchBoard = async () => {
    const response = await fetch('/api/jogo-da-velha');
    const data = await response.json();
    setBoard(data.board);
    setWinner(data.winner);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleClick = async (index) => {
    const response = await fetch('/api/jogo-da-velha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    });

    if (response.ok) {
      const data = await response.json();
      setBoard(data.board);
      setWinner(data.winner);
    } else {
      console.error('Invalid move');
    }
  };

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
