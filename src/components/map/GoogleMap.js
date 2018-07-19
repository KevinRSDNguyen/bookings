import React from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  // Marker,
  Circle,
  InfoWindow // Display error if invalid address
} from "react-google-maps";

const MapComponent = ({ coordinates, isError, isLocationLoaded }) => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      {!isError && <Circle center={coordinates} radius={500} />}
      {isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            There was a problem finding the location on the map. Contact host
            for additional information if you are still interested in booking
            this place. We are sorry for incovienence.
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    state = {
      coordinates: {
        lat: 0,
        lng: 0
      },
      isError: false
    };
    componentDidMount() {
      this.getGeocodedLocation();
    }
    updateCoordinates(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }
    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            resolve(coordinates);
          } else {
            reject("ERROR!!!!");
          }
        });
      });
    }
    getGeocodedLocation() {
      const location = this.props.location;
      // const location = "sfdfdsdgf";
      this.geocodeLocation(location).then(
        coordinates => {
          this.updateCoordinates(coordinates);
        },
        error => {
          this.setState({ isLocationLoaded: true, isError: true });
        }
      );
    }
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
//Look up doc for HOC "withScriptJS"
