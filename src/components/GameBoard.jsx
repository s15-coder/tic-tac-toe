import { useState } from 'react'
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard)
    function playTurn(rowIndex, colIndex) {
        setGameBoard(previousGameBoard => {
            const newGameBoard = [...previousGameBoard.map(rowData => [...rowData])]
            newGameBoard[rowIndex][colIndex] = 'X'
            return newGameBoard
        })
    }
    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                    <li key={colIndex}>
                        <button onClick={() => playTurn(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)
                }
            </ol>
        </li>)}
    </ol>
}