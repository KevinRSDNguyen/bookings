import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "actions/index";

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.fetchRentalById(rentalId);
  }
  render() {
    const rental = this.props.rentals;

    if (rental) {
      return (
        <div>
          <p>{rental.title}</p>
          <p>{rental.city}</p>
          <p>{rental.description}</p>
          <p>{rental.dailyRate}</p>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentalById }
)(RentalDetail);
