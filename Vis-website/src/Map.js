import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import * as d3 from 'd3';
import "./styles/Map.css";
import './CountryMap';
import {countryMap, rankingCounrties} from "./CountryMap";
import {legendColor} from "d3-svg-legend";

function Map(props) {

    const chartRef = useRef(null);
    const distribution = props.distribution;

    useEffect(() => {
        // load world map data
        d3.json('https://raw.githubusercontent.com/janasayantan/datageojson/master/world.json').then((worldData) => {
            let svg = d3.select(chartRef.current)
                .append('svg')
                .attr('id', 'worldMap')
                .style('background', 'white')
                .attr('width', '100%')
                .attr('height', '100%');

            // set color scale for games
            const uniqueGames = new Set();
            const disMap = {};

            distribution.forEach((v) => {
                uniqueGames.add(v.name);
                disMap[v.region] = v.name;
            });

            let colorScale = d3.scaleOrdinal()
                .domain(Array.from(uniqueGames))
                .range(['#003153', '#2e8b57', '#ffbf00', '#e6c35c',  '#cca3cc', '#b22222', '#00ffff'])
                .unknown('grey');

            const width = document.getElementById('map-container').offsetWidth * .95;
            const height = document.getElementById('map-container').offsetHeight * .95;

            let projection = d3.geoMercator()
                .scale(130)
                .center([0, 20])
                .translate([width / 2, height / 2]);
            let path = d3.geoPath();

            let map = svg.append('g')
                .attr('id', 'Map')
                .selectAll('path')
                .data(worldData.features)
                .enter()
                .append('path')
                .attr('d', path.projection(projection))
                .attr('fill', function (d) {
                    d = d.properties.name;
                    if (countryMap[d]) d = countryMap[d];
                    if (disMap[d]) return colorScale(disMap[d]);
                    return 'grey';
                });

            let legend = legendColor()
                .scale(colorScale);

            map.on('mouseover', function () {
                d3.select(this)
                    .attr('opacity', .5);
            })
                .on('mouseout', function () {
                    d3.select(this)
                        .attr('opacity', 1);
                })
                .on('click', function (d) {
                    let transform = (e) => {
                        return countryMap.hasOwnProperty(e.toString()) ? countryMap[e.toString()] : e;
                    };
                    let ans = transform(d.properties.name);
                    rankingCounrties.includes(ans) && props.clickChange(ans);
                })
                .on('dbclick', function (d) {
                    props.clickChange('global');
                })

            svg.append('g')
                .attr('id', 'legend')
                .attr("transform",  "translate(0," + ( height - 180) + ")" )
                .call(legend);
        })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    return (
        <>
            <h3 style={{textAlign:'center'}}>Top Game Distribution</h3>
            <div className="map" ref={chartRef} id='map-container'/>
        </>

    );
}

Map.propTypes = {
    /**
     * Data that comes from the api about all countries including - country name,
     * cases, deaths and recovered(all needed for the map).
     */
    countries: PropTypes.array.isRequired,
    /**
     * Depending on the caseType, the circles on the map represent the maount of {caseType} in that country.
     */
    casesType: PropTypes.oneOf(["cases", "deaths", "recovered"]),
    /**
     * The coordinates where the map will be centered.
     */
    center: PropTypes.shape({lat: PropTypes.number, lng: PropTypes.number}),
    /**
     * How zoomed the map will be.
     */
    zoom: PropTypes.number.isRequired,
};

export default Map;
