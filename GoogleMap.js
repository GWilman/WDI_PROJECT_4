/* global google */

import React from 'react';
import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainer, {
      center: this.props.center,
      zoom: 14,
      styles: mapStyles
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.props.center
    });
  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div ref={ element => this.mapContainer = element } className="google-map">Google Map goes here...</div>
    );
  }
}

export default GoogleMap;
