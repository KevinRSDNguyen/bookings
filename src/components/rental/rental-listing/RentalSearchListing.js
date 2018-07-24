import React, { Component } from "react";
import RentalList from "./RentalList";
import { connect } from "react-redux";

import { toUpperCase } from "helpers";
import { fetchRentals } from "actions/index";

class RentalSearchListing extends Component {
  state = {
    searchedCity: ""
  };
  componentDidMount() {
    // Component did mount is not done a second time
    this.searchRentalsByCity();
  }
  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalsByCity();
    }
  }
  searchRentalsByCity = () => {
    const searchedCity = this.props.match.params.city;
    this.setState({ searchedCity });

    this.props.fetchRentals(searchedCity);
  };
  renderTitle() {
    const { errors } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = "";

    if (errors.length > 0) {
      title = errors[0].detail;
    } else {
      title = `Available Homes in City of ${toUpperCase(searchedCity)}`;
    }

    return <h1 className="page-title">{title}</h1>;
  }
  render() {
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <RentalList rentals={this.props.rentals.data} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
};

export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalSearchListing);
