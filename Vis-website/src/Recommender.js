import React, {useState} from 'react';
import Input from "./Input";
import ControlledAccordions from './Filter';
import ResultsTables from './Result';
import './styles/recommender.css';
import {Step, StepLabel, Stepper} from "@material-ui/core";

export default function Recommender() {
    const steps = ['Choose games your like', 'Filter the game', 'get the result'];
    const [stepState, setStepState] = useState(0);
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
                {/*// 立即执行函数与箭头函数的概念不清粗*/}
                {((stepState, setStepState) => {
                    switch (stepState) {
                        case 0:
                            return <Input step={[stepState, setStepState]} />;
                        case 1:
                            return <ControlledAccordions step={[stepState, setStepState]} />;
                        default:
                            return <ResultsTables step={[stepState, setStepState]} />;
                        }
                    }) (stepState, setStepState)
                }
            </div>
        </div>
    );

};