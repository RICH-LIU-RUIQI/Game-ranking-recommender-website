import React, { useState} from "react";
import {TextField} from "@material-ui/core";
import './styles/GameInput.css';
import data from './dummy_data/listdata.json';

function List(props) {
    const filterData = data.filter((el) => {
     if(props.input === '') {
         return ;
     }
     else {
         return el.game.toLowerCase().includes(props.input);
     }
    })
    let setGameArray = props.func;
    let gameArray = props.gameArray;

    return (
        <ul>
            {filterData.slice(0, 5).map((item) => (
                <li key={item.id}>
                    <div className='choice' onClick={
                        (e) => {
                            if (gameArray.length < 5){setGameArray([...gameArray, item.game]);}
                        }
                    }>
                        {item.game}
                    </div>
                </li>
            ))}
        </ul>
    )

}

function InputLabel(props) {
    return (
        <div className='result-container'>
            <ul>
                {props.game.map((item) => (
                    <li key={item}>
                        <div className='result'>{item}</div>
                    </li>
                ))}
            </ul>
        </div>

    );
}


function Input() {
    const [inputText, setInputText] = useState('');
    const [gameArray, setGameArray] = useState([]);
    let inputHandler = (e) => {
        let text = e.target.value.toLowerCase();
        setInputText(text);
    };
    return (
        <div className='main'>
            <h1 >Game History</h1>
            <span >Choose the game you like(at most 5)</span>
            <div className='search'>
                <TextField
                fullWidth={true}
                label='Search'
                variant='outlined'
                onChange={inputHandler}
                />

            </div>
            <div id='below-search-bar'>
                <List input={inputText} func={setGameArray} gameArray={gameArray}/>
                <h3>Input Game</h3>
                <InputLabel game={gameArray} />
            </div>

        </div>
    );
}

export default Input;