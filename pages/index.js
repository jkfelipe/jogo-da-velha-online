import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [jogadas, setJogadas] = useState(0); // Contador de jogadas
  const [proximaJogada, setProximaJogada] = useState(true); // Alterna entre o jogador e o bot

  const fetchBoard = async () => {
    const response = await fetch('/api/jogo-da-velha');
    const data = await response.json();
    setBoard(data.board);
    setWinner(data.winner);
    setJogadas(data.jogadas || 0);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  // Função para lidar com o clique do jogador
  const handleClick = async (index) => {
    if (board[index] || winner || !proximaJogada) return; // Impede jogadas inválidas ou depois de vitória

    // Envia a jogada do jogador para a API
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
      setJogadas(jogadas+1);
      setProximaJogada(false); // Agora é a vez do bot
      setTimeout(() => botMove(data.board), 500); // Aguarda um tempo para o bot jogar
    } else {
      console.error('Jogada inválida');
    }
  };

  // Função para o bot jogar
  const botMove = async (currentBoard) => {
    const emptySquares = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length === 0) return;

    // Escolhe um movimento aleatório
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const response = await fetch('/api/jogo-da-velha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: randomIndex }),
    });

    if (response.ok) {
      const data = await response.json();
      setBoard(data.board);
      setWinner(data.winner);
      setJogadas(jogadas+1);
      setProximaJogada(true); // Agora é a vez do jogador
    } else {
      console.error('Erro ao realizar a jogada do bot');
    }
  };

  // Função para resetar o jogo
  const resetGame = async () => {
    const response = await fetch('/api/jogo-da-velha', {
      method: 'DELETE',
    });

    if (response.ok) {
      setBoard(Array(9).fill(null)); // Reseta o tabuleiro
      setWinner(null);
      setJogadas(0);
      setProximaJogada(true); // O jogador começa primeiro
    } else {
      console.error('Erro ao resetar o jogo');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div>
        <h1 className="text-white text-center text-2xl mb-1">Jogo da Velha</h1>
        <h4 className="text-white text-center mb-3">Player vs Bot</h4>
  
        {/* Div que centraliza os botões */}
        <div className="flex justify-center mb-6">
          <Link href="/pvp">
            <button className="bg-purple-500 text-white px-4 py-2 rounded mr-2">
              Player vs Player
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
        {jogadas === 5 && !winner && (
          <p className="text-white text-center mt-6">Não houve ganhadores!</p>
        )}
        <p className="text-white text-center mt-6">Suas jogadas: {jogadas}</p>
      </div>
    </div>
  );
  
}
