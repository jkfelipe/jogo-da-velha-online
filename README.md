# Jogo da Velha com Bot Inteligente

Este é um projeto de Jogo da Velha desenvolvido em JavaScript e React, que inclui um bot que utiliza o algoritmo **Minimax** para fazer jogadas estratégicas contra o usuário. O bot é projetado para otimizar suas chances de ganhar ou empatar o jogo.

## Funcionalidades

- **Modo de Jogo**: Player vs. Bot (jogador contra a máquina) e Player vs. Player.
- **Bot Inteligente**: O bot usa o algoritmo Minimax para calcular as melhores jogadas.
- **Interface Interativa**: Interface amigável e visualização em tempo real do tabuleiro.
- **Lógica da API**: A lógica do jogo é processada por uma API, responsável por validar jogadas, calcular o vencedor e definir o próximo movimento do bot.

## Tecnologias Utilizadas

- **Front-End**: React, Tailwind CSS (para estilização e layout).
- **Back-End**: API criada para lidar com a lógica do jogo e definir o comportamento do bot.
- **Algoritmo Minimax**: Algoritmo para calcular a melhor jogada do bot.

## Como Funciona o Algoritmo Minimax

O Minimax é um algoritmo recursivo usado em jogos de soma zero para calcular a jogada ideal. Ele simula todas as jogadas possíveis do bot e do jogador, atribuindo uma pontuação a cada possível estado do tabuleiro:
- **+10**: Vitória do bot.
- **-10**: Vitória do jogador.
- **0**: Empate.

Com base nessas pontuações, o bot seleciona a jogada que maximiza sua pontuação ou minimiza a do oponente, garantindo sempre o melhor resultado possível para si.

## Como Executar o Projeto

### Pré-requisitos

1. Instale o Node.js.
2. Instale o gerenciador de pacotes `pnpm`, caso ainda não tenha:
   ```bash
   npm install -g pnpm

### Instalação

1. Clone o repositório:
`git clone https://github.com/jkfelipe/jogo-da-velha-online.git`
2. Navegue para o diretório do projeto:
`cd jogo-da-velha-bot`
3. Instale as dependências:
`pnpm install`

### Executando o Projeto
1. Inicie o servidor de desenvolvimento:
`pnpm dev`
2. Acesse o aplicativo em `http://localhost:3000`

## Estrutura do Código
- **Front-End**: O componente principal Home é responsável por exibir o tabuleiro e interagir com a API.
- **API:** A API, configurada no arquivo `pages/api/jogo-da-velha.js`, gerencia a lógica do jogo. Ela recebe as jogadas do usuário, processa a lógica do Minimax para o bot, e retorna o estado atualizado do tabuleiro e o vencedor, se houver.
- **Algoritmo Minimax:** Implementado para o bot no arquivo da API, permitindo que ele escolha a jogada ideal em cada rodada.

### Exemplo de Uso
1. O usuário começa o jogo fazendo a primeira jogada no tabuleiro.
2. O bot processa a jogada e faz seu movimento calculado pelo Minimax, com um pequeno atraso para simular a "pensatividade" do bot.
3. O jogo continua até que haja um vencedor ou empate.

### Contato
Desenvolvido por Kalan Felipe Trentin. Sinta-se à vontade para contribuir com melhorias ou sugestões para o projeto!