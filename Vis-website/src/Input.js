import React, { useState} from "react";
import {TextField} from "@material-ui/core";
import './styles/GameInput.css';
import data from './dummy_data/gameNames.json';
import Button from "@material-ui/core/Button";

function List(props) {
    const filterData = data.filter((el) => {
     if(props.input === '') {
         return;
     }
     else {
         return el.toLowerCase().includes(props.input);
     }
    })
    let setGameArray = props.func;
    let gameArray = props.gameArray;

    return (
        <ul className='gamesUl'>
            {filterData.slice(0, 5).map((item, idx) => (
                <li key={idx}>
                    <div className='choice' onClick={
                        (e) => {
                            if (gameArray.length < 5){setGameArray([...gameArray, item]);}
                        }
                    }>
                        {item}
                    </div>
                </li>
            ))}
        </ul>
    )

}

function InputLabel(props) {
    return (
        <div className='result-container'>
            <ul className='gamesUl'>
                {props.game.map((item) => (
                    <li key={item}>
                        <div className='result'>{item}</div>
                    </li>
                ))}
            </ul>
        </div>

    );
}


function Input(props) {
    const [stepState, setStepState] = props.step;
    const [submitItems, setSubmitItems] = props.submit;
    const [inputText, setInputText] = useState('');
    const [gameArray, setGameArray] = useState([]); // to submit

    const submit = function () {
        if(gameArray.length === 0) {
            alert('Please choose at least one game');
        } else {
            setSubmitItems({
                inputGames: gameArray,
                filters: submitItems.filters,
            });
            setStepState(stepState + 1);
        }
    };

    let inputHandler = (e) => {
        let text = e.target.value.toLowerCase();
        setInputText(text);
    };
    return (
        <div className='main-input'>
            <h2 >Favorite Games</h2>
            <div className='search'>
                <div className='tip'>Choose the game you like(at most 5)</div>
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
            <div style={{display: 'flex',flex: 'auto', justifyItems: 'flex-end'}}>
                <Button variant="outlined"
                        style={{position: 'relative', margin: "auto"}}
                        onClick={submit}
                >Submit</Button>
            </div>
        </div>
    );
}

export default Input;