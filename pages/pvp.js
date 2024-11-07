import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [jogadas, setJogadas] = useState(null);
  
  const fetchBoard = async () => {
    resetGame();
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
      setJogadas(jogadas+1);
      setBoard(data.board);
      setWinner(data.winner);
    } else {
      console.error('Invalid move');
    }
  };

  const resetGame = async () => {
    const response = await fetch('/api/jogo-da-velha', {
      method: 'DELETE',    
    });

    if (response.ok) {
      setBoard(Array(9).fill(null)); // Reseta o tabuleiro
      // setIsXNext(true); // Define que o jogador "X" joga primeiro   
      setWinner(null); 
      setJogadas(null);  
    } else {
      console.error('Erro ao resetar game');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div>
        <h1 className="text-white text-center text-2xl mb-1">Jogo da Velha</h1>
        <h4 className="text-white text-center mb-3">Player vs Player</h4>

        {/* Div que centraliza os botões */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <button className="bg-purple-500 text-white px-4 py-2 rounded mr-2">
              Player vs Bot
            </button>
          </Link>
  
          {jogadas > 0 && (
            <button
              onClick={resetGame}
              className="bg-purple-500 text-white px-4 py-2 rounded"
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