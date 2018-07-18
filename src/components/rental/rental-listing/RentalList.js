import React, { Component } from "react";
import RentalCard from "./RentalCard";

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

export default RentalList;
