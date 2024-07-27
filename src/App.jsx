import { useState } from 'react'

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Logs from './components/Logs'
import GameOver from './components/GameOver'

import { WINNING_COMBINATIONS } from './winning-combinations'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns) {

  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function defineWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && secondSquareSymbol == thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const gameBoard = deriveGameBoard(gameTurns)

  let winner = defineWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  const currentPlayer = deriveCurrentPlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(previousTurns => {
      const currentSymbol = deriveCurrentPlayer(previousTurns)
      const newTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentSymbol,
        },
        ...previousTurns,
      ]
      return newTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function onSavePlayer(symbol, name) {
    setPlayers(previousPlayers => {
      return {
        ...previousPlayers,
        [symbol]: name
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X}
            symbol="X"
            isActive={currentPlayer === 'X'}
            onSavePlayer={onSavePlayer}
          />
          <Player initialName={PLAYERS.O}
            symbol="O"
            isActive={currentPlayer === 'O'}
            onSavePlayer={onSavePlayer}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  )
}

export default App
