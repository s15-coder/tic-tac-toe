export default function Logs({ turns }) {
    return <ol id='log'>
        {turns.map((turn, index) => {
            return <li key={`${turn.square.col}` + `${turn.square.row}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>
        })}
    </ol>
}