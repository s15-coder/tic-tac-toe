import { useState } from 'react'

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Logs from './components/Logs'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './components/GameOver'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const gameBoard = [...initialGameBoard.map(array => [...array])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && secondSquareSymbol == thirdSquareSymbol) {
      winner = firstSquareSymbol
    }
  }
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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={currentPlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={currentPlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  )
}

export default App
