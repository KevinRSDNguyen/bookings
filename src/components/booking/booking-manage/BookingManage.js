import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BookingCard from "./BookingCard";
import { fetchUserBookings } from "actions/index";

class BookingManage extends Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }
  renderBookings(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard booking={booking} key={index} />
    ));
  }
  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    return (
      <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">{this.renderBookings(bookings)}</div>
        {!isFetching &&
          bookings.length === 0 && (
            <div className="alert alert-warning">
              You have no bookings. Go to rentals section and book your place
              today.
              <Link
                style={{ marginLeft: "10px" }}
                className="btn btn-bwm"
                to="/rentals"
              >
                Available Rental
              </Link>
            </div>
          )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    userBookings: state.userBookings
  };
};

export default connect(
  mapStateToProps,
  { fetchUserBookings }
)(BookingManage);
