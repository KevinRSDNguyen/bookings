import React, { Component } from "react";
import { MapWithGeocode } from "components/map/GoogleMap";
import { connect } from "react-redux";
import { reloadMapFinish } from "actions/index";

class RentalMap extends Component {
  reloadMapFinish = () => {
    this.props.reloadMapFinish();
  };
  render() {
    const {
      location,
      map: { isReloading }
    } = this.props;
    // location is string with city,street
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqWKG6hjcDPOGI9OAABK8Cv849hPS189M&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(
  mapStateToProps,
  { reloadMapFinish }
)(RentalMap);
