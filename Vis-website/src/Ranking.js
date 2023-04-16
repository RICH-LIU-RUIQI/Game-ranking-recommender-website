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
import {sortData, prettyPrintStat} from "./util";
import BlogCardDemo from "./GameDetail";

import "leaflet/dist/leaflet.css";
import "./styles/Ranking.css";
import Button from "@material-ui/core/Button";

const Ranking = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 7.8731,
        lng: 80.7718,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    // new added hooks for project
    const [gameDetail, setGameDetail] = useState(new Array(3).fill({}));  // use id to represent games
    const [detailLabel, setDetailLabel] = useState(0); // represent the game to show details
    const [topGame, setTopGame] = useState(null);

    /**
     * Render initial data for the whole world. The data is displayed in the info boxes.
     */
    // useEffect(() => {
    //   fetch("https://disease.sh/v3/covid-19/all")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setCountryInfo(data);
    //     });
    // }, []);

    // get top 3 game ids for selected countries
    useEffect(() => {
        // load hottest 3 games by country
        // ....
        // setGameDetail(new array) update games details
        //
        console.log(country);

    }, [country]);

    //
    // useEffect()

    /**
     * Get data for all individual countries.
     */
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            // await fetch("https://www.cnblogs.com/yuanjili666/p/11573308.html", {mode: 'cors'})
                .then((res) => res.json())
                .then((data) => {
                    // Filter the data to have only the country name and country code. Used for the dropdown
                    const countryInfo = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));

                    // Sort the (full) data for the table on the right hand side to display in reducing order.
                    const sortedData = sortData(data);

                    // Set the full data to state which is then passed down to the Map component.
                    setMapCountries(data);
                    setCountries(countryInfo);
                    setTableData(sortedData);
                });
        };
        getCountriesData(); // async functions must be declared/created first and then executed.
    }, []);

    const onCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const Rank = () => {
        return (
            <>
                <div className="app__left">
                    <div className="app__header">
                        <h1>Game World Map</h1>
                        <FormControl className="app__dropdown">
                            <Select
                                onChange={onCountryChange}
                                variant="outlined"
                                value={country}
                            >
                                <MenuItem value="worldwide">Worldwide</MenuItem>
                                {countries.map((country, id) => (
                                    <MenuItem key={id} value={country.name}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="app__stats">
                        <InfoBox
                            // onClick={(e) => setCasesType("recovered")}
                            onClick={() => {
                            }}
                            game="Overwatch"
                            cate='Multiplayer, Online'
                            image='https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                            rank={1}
                        />
                        <InfoBox
                            // onClick={(e) => setCasesType("recovered")}
                            onClick={() => {
                            }}
                            game="Overwatch"
                            cate='Multiplayer, Online'
                            image='https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                            rank={2}
                        />
                        <InfoBox
                            // onClick={(e) => setCasesType("recovered")}
                            onClick={() => {
                            }}
                            game="Overwatch"
                            cate='Multiplayer, Online'
                            image='https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                            rank={3}
                        />
                    </div>

                    <Map
                        clickChange={setCountry}
                    />
                </div>
                <Card className="app__right">
                    <CardContent>
                        <h3 className="app__graphTitle">Game Details</h3>
                        <BlogCardDemo details={gameDetail[detailLabel]}/>
                        <h3 style={{marginTop: 40}}>Popular Game by country</h3>
                        <Table countries={tableData}/>
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
        <div className="app">
            <Rank></Rank>
        </div>
    );
};

export default Ranking;
