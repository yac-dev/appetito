import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Link } from 'react-router-dom';

import dotenv from 'dotenv';
dotenv.config('../.env');

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = 'pk.eyJ1IjoieWFiYmVlIiwiYSI6ImNrdWdmZzQ2cDFucjEycm10OTkzOWxsZW0ifQ.IIgIM6uIqBoQQYMpRQKGhQ';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 12,
    };

    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 1,
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <Link to='/ether/contribute'>You wanna contibute?</Link>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default Map;
