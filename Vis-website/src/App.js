import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat, prettyLargeStat } from "./util";
import LineGraph from "./LineGraph";
import BlogCardDemo from "./GameDetail";

import "leaflet/dist/leaflet.css";
import "./styles/App.css";

const App = () => {
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

  /**
   * Render initial data for the whole world. The data is displayed in the info boxes.
   */
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  /**
   * Get data for all individual countries.
   */
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
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

  /**
   * Fetch data for the selected country.
   */
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        // This is needed because if the user selects back to worldwide (after going to a country),
        // the worldwide api does not return the same data format and I
        // just set the mapCenter state to the initial one.
        countryCode === "worldwide"
          ? setMapCenter({
              lat: 34.80746,
              lng: -40.4796,
            })
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
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
                <MenuItem key={id} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            active={casesType === "cases"}
            // onClick={(e) => setCasesType("cases")}
              onClick={()=>{}}
            game="PUBG"
            cate='Multiplayer, Shooting'
            image='https://www.itp.net/public/styles/full_img_sml/public/images/2019/05/27/44485-pubg_base1.jpg?itok=EF911Xan'
            total={prettyPrintStat(countryInfo.cases)}
            rank={1}
          />
          <InfoBox
            active={casesType === "recovered"}
            // onClick={(e) => setCasesType("recovered")}
            onClick={()=>{}}
            game="Overwatch"
            cate='Multiplayer, Online'
            image='https://images5.alphacoders.com/690/thumb-1920-690653.png'
            total={prettyPrintStat(countryInfo.recovered)}
            rank={2}
          />
          <InfoBox
            active={casesType === "deaths"}
            // onClick={(e) => setCasesType("deaths")}
            onClick={()=>{}}
            game="DOTA 2"
            cate='Multiplayer, Strategy'
            image='https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
            total={prettyPrintStat(countryInfo.deaths)}
            rank={3}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
            <h3 className="app__graphTitle">Game Details</h3>
            <BlogCardDemo></BlogCardDemo>
            <h3 style={{marginTop: 40}}>Popular Game by country</h3>
            <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
