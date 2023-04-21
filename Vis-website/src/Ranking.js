import React, {useState, useEffect} from "react";
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent, Tabs, Link,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import BlogCardDemo from "./GameDetail";
import axios from 'axios';

import "leaflet/dist/leaflet.css";
import "./styles/Ranking.css";
import './CountryMap';
import {rankingCounrties} from "./CountryMap";

const Ranking = () => {
    const allCountries = rankingCounrties;
    const [country, setCountry] = useState(allCountries[0]);
    const [tableData, setTableData] = useState([]);
    const [topGame, setTopGame] = useState([]);
    // new added hooks for project
    const [selectedGame, setSelectedGame] = useState({});
    const baseAxios = axios.create({
        topGames: "/games",
    });

    // get top 3 game info for selected countries
    useEffect(() => {
        let addedURL = '?region=' + encodeURIComponent(country);
        baseAxios.get(addedURL)
            .then((re) => {
                let newGames = [];
                re.data.forEach((v) => newGames.push(v));
                setTopGame(newGames);
            })
            .catch((error) => {console.log('cannot load top 3 data');});
    }, [country]);

    // get top one game
    useEffect(() => {
        const topGameUrl = '/firstgame';
        axios.get(topGameUrl)
            .then((re) => {
                let tmp = [];
                re.data.forEach((v) => tmp.push(v));
                setTableData(tmp);
            })
            .catch((error) => {console.log('cannot load first game data');});
    }, []);

    const Rank = () => {

        const MapDisplay = () => {
            if(tableData.length > 0) {
                return <Map clickChange={setCountry} distribution={tableData}/>
            }
            return (<div>Creating Map...</div>)
        };

        const TableDisplay = () => {
            if(tableData.length > 0) {
                return (<Table countries={tableData}/>);
            } else return (<div>Loading...</div>)
        };

        const GameDetailsPage = () => {

            if(Object.keys(selectedGame).length > 0){
                return (<CardContent>
                    <h3 className="app__graphTitle">Game Details</h3>
                    <BlogCardDemo details={selectedGame}/>
                    <h3 style={{marginTop: 40}}>Popular Game by country</h3>
                    <TableDisplay/>
                </CardContent>);
            } else {
                return (<CardContent>
                    <h3 className="app__graphTitle">Game Details</h3>
                    <h3 style={{marginTop: 40}}>Popular Game by country</h3>
                    <TableDisplay/>
                </CardContent>);
            }
        };

        if(topGame.length > 0) {
            return (
                <>
                    <div className="app__left">
                        <div className="app__header">
                            <h1>Game Trending</h1>
                            <FormControl className="app__dropdown">
                                <Select
                                    onChange={ e => setCountry(e.target.value) }
                                    variant="outlined"
                                    value={country}
                                >
                                    {allCountries.map((country, id) => (
                                        <MenuItem key={id} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="app__stats">
                            <InfoBox
                                game={topGame[0]}
                                click={setSelectedGame}
                                rank={1}
                            />
                            <InfoBox
                                game={topGame[1]}
                                click={setSelectedGame}
                                rank={2}
                            />
                            <InfoBox
                                game={topGame[2]}
                                click={setSelectedGame}
                                rank={3}
                            />
                        </div>

                        <MapDisplay/>
                    </div>
                    <Card className="app__right">
                        <GameDetailsPage/>
                    </Card>
                </>
            );
        } else {
            return (<div>Loading...</div>);
        }

    }
    return (
        <div className="app">
            <Rank></Rank>
        </div>
    );

};

export default Ranking;
