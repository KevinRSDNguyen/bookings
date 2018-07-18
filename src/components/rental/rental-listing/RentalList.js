import React, { Component } from "react";
import RentalCard from "./RentalCard";

import { fetchRentals } from "actions/index";

class RentalList extends Component {
  renderRentals = () => {
    return this.props.rentals.map((rental, i) => {
      return <RentalCard key={i} colNum="col-md-3 col-6" rental={rental} />;
    });
  };
  render() {
    return <div className="row">{this.renderRentals()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

export default RentalList;
