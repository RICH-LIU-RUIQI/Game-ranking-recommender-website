import React from 'react';
import Input from "./Input";
import ControlledAccordions from './Filter';
import ResultsTables from './Result';
import './styles/recommender.css';

export default function Recommender() {
    return (
        <div>
            <div id='navigation' >
                {/*navigation code*/}
            </div>

            <div id='container'>
                <Input/>
                <ControlledAccordions/>
                <ResultsTables/>
            </div>
        </div>
    );

};