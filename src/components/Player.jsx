import { useState } from "react"

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)
    function changeEditing() {
        setIsEditing(oldEditing => !oldEditing)
    }
    function handleOnChange(event) {
        setPlayerName(event.target.value)
    }

    let playerNameElement = <span className="player-name">{playerName}</span>

    if (isEditing) {
        playerNameElement =
            <input
                type="text"
                required value={playerName}
                onChange={handleOnChange}>
            </input>
    }
    return <li>
        <span className="player">
            {playerNameElement}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={changeEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}
