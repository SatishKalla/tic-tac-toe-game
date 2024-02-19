import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

import { WINNING_COMBINATIONS } from './data';

const defaultPlayers = {
  X: 'Player 1',
  O: 'Player 2'
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].symbol === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};


const deriveWinner = (gameBoard, players) => {
  let winner;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(defaultPlayers);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((inner) => [...inner])];

  for(const turn of gameTurns) {
    const { square, symbol } = turn;
    const { row, col } = square;

    gameBoard[row][col] = symbol;
  }

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, symbol: currentPlayer},
        ...prevTurns
      ];
      return updatedTurns;
    })
  }

  const handleRematch = () => {
    setGameTurns([]);
    setPlayers(defaultPlayers)
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          {
            Object.keys(players).map((playerSymbol) => {
              return <Player name={players[playerSymbol]} symbol={playerSymbol} key={playerSymbol} isActive={activePlayer === playerSymbol} onChangeName={handlePlayerNameChange}/>;
            })
          }
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
