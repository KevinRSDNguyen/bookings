import React, { Component } from "react";
import { connect } from "react-redux";
import RentalList from "./RentalList";

import { fetchRentals } from "actions/index";

class RentalListing extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }
  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Available Homes All Around the World</h1>
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
)(RentalListing);
