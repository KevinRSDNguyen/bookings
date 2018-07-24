import React, { Component } from "react";
import RentalList from "./RentalList";
import { connect } from "react-redux";

import { fetchRentals } from "actions/index";

class RentalSearchListing extends Component {
  state = {
    searchedCity: ""
  };
  componentDidMount() {
    this.searchRentalsByCity();
  }
  searchRentalsByCity = () => {
    const searchedCity = this.props.match.params.city;
    this.setState({ searchedCity });

    this.props.fetchRentals(searchedCity);
  };
  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">
          Available places in {this.state.searchedCity}
        </h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalSearchListing);
