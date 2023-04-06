import React, {Component, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Leaflet from "leaflet";
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import * as d3 from 'd3';
import { showDataOnMap } from "./util";
import "./styles/Map.css";
import {render} from "react-dom";

function Map({ countries, casesType, center, zoom }) {

  const chartRef = useRef(null);

  useEffect(()=> {
    // load world map data
    d3.json('https://raw.githubusercontent.com/janasayantan/datageojson/master/world.json').then((worldData) => {
      console.log(worldData);
      let svg = d3.select(chartRef.current)
          .append('svg')
          .attr('id', 'worldMap')
          .style('background', 'white')
          .attr('width', '100%')
          .attr('height', '100%');

      const width = document.getElementById('map-container').offsetWidth * .95 ;
      const height = document.getElementById('map-container').offsetHeight * .95;

      console.log(width);
      let projection = d3.geoMercator()
          .scale(130)
          .center([0, 20])
          .translate([width/2, height/2]);
      let path = d3.geoPath();

      let map = svg.append('g')
          .attr('id', 'Map')
          .selectAll('path')
          .data(worldData.features)
          .enter()
          .append('path')
          .attr('d', path.projection(projection))
          .attr('stroke','black')
          .attr('stroke-width', 1);

      map.on('mouseover', function () {
        d3.select(this)
            .attr('opacity', .5)
            .attr('stroke', 'white');
      })
          .on('mouseout', function () {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
          })
    })
        .catch((error) => {console.log(error);});

  }, []);
    return (
        <div className="map" ref={chartRef} id='map-container'>
        </div>
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
  center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  /**
   * How zoomed the map will be.
   */
  zoom: PropTypes.number.isRequired,
};

export default Map;
