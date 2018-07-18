import React, { Component } from "react";
import { connect } from "react-redux";
import RentalCard from "./RentalCard";

import { fetchRentals } from "actions/index";

class RentalList extends Component {
  renderRentals = () => {
    return this.props.rentals.map((rental, i) => {
      return <RentalCard key={i} colNum="col-md-3 col-6" rental={rental} />;
    });
  };
  componentDidMount() {
    this.props.fetchRentals();
  }
  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
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
)(RentalList);
