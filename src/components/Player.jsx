import { useState, useEffect } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }
    const handleClick = () => {
        setIsEditing((editing)=> !editing);

        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    useEffect(() => {
        setPlayerName(name);
    }, [name]);

    const editPlayerName = isEditing ? <input type="text" required value={playerName} onChange={handleChange}/> : <span className="player-name">{playerName}</span>

    return (
        <li className={isActive ? 'active': undefined}>
            <span className="player">
                {editPlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}