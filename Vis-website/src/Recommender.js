import React, {useState} from 'react';
import Input from "./Input";
import ControlledAccordions from './Filter';
import ResultsTables from './Result';
import './styles/recommender.css';
import {Step, StepLabel, Stepper} from "@material-ui/core";

export default function Recommender() {
    const steps = ['Choose games your like', 'Filter the game', 'get the result'];
    const [stepState, setStepState] = useState(0);
    // load get related game categories, get result of 20 games
    // submit history game name, submit filters,
    const [submitItems, setSubmitItems] = useState({
        inputGames: [],
        filters: {
            price: 100,
            year: 2000,
            labels: [],
        },
    })

    return (
        <div className='main'>
            <div className='header'>
                <h1>Game Recommender</h1>
            </div>
            <div className='tab'>
                <Stepper style={{backgroundColor: '#F4EEE8', borderRadius: 10}} activeStep={stepState}>

                    {steps.map((label, idx) => (
                        <Step key={label} onClick={() => {
                            if(stepState >= idx) setStepState(idx);
                        }}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className='content'>
                {((stepState, setStepState, submitItems, setSubmitItems) => {
                    switch (stepState) {
                        case 0:
                            return <Input step={[stepState, setStepState]} submit={[submitItems, setSubmitItems]} />;
                        case 1:
                            return <ControlledAccordions step={[stepState, setStepState]} submit={[submitItems, setSubmitItems]} />;
                        default:
                            if(submitItems.inputGames.length === 0) {
                                alert('We don\'t receive any input' );
                                return <Input step={[stepState, setStepState]} submit={[submitItems, setSubmitItems]} />;
                            }
                            return <ResultsTables submit={[submitItems, setSubmitItems]} />;
                        }
                    }) (stepState, setStepState, submitItems, setSubmitItems)
                }
            </div>
        </div>
    );

};