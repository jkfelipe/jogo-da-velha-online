import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [jogadas, setJogadas] = useState(0);

  const resetGame = async () => {
    const response = await fetch('/api/jogo-da-velha-minimax', { method: 'DELETE' });
    if (response.ok) {
      const data = await response.json();
      setBoard(data.board);
      setWinner(null);
      setJogadas(0);
    }
  };

  const handleClick = async (index) => {
    if (board[index] || winner) return;

    const response = await fetch('/api/jogo-da-velha-minimax', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board, index }),
    });

    if (response.ok) {
      const data = await response.json();
      setBoard(data.board);
      setWinner(data.winner);
      setJogadas(jogadas + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div>
        <h1 className="text-white text-center text-2xl mb-1">Jogo da Velha</h1>
        <h4 className="text-white text-center mb-3">Player vs Minimax</h4>
        {/* Div que centraliza os botões */}
        <div className="flex justify-center mb-6">
            <Link href="/">
              <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2">
                Player vs Bot
              </button>
            </Link>
    
            {jogadas > 0 && (
              <button
                onClick={resetGame}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Novo Jogo
              </button>
            )}
          </div>
        <div className="grid grid-cols-3 gap-4">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 flex justify-center items-center bg-transparent border-4 border-orange-500 hover:bg-gray-800 cursor-pointer"
            >
              <span className="text-5xl text-white">{value}</span>
            </div>
          ))}
        </div>
        
        {winner && <p className="text-white text-center mt-6">{winner} venceu!</p>}
        {jogadas === 9 && !winner && (
          <p className="text-white text-center mt-6">Não houve ganhadores!</p>
        )}
      </div>
    </div>
  );
}
