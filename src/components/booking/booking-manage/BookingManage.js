import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toUpperCase } from "helpers";
import { connect } from "react-redux";
import { fetchUserBookings } from "actions/index";

class BookingManage extends Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }
  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    return (
      <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">
          {bookings.map((booking, index) => {
            return (
              <div className="col-md-4" key={index}>
                <div className="card text-center">
                  <div className="card-header">
                    {booking.rental
                      ? booking.rental.category
                      : "Deleted Rental"}
                  </div>
                  <div className="card-block">
                    {booking.rental && (
                      <React.Fragment>
                        <h4 className="card-title">
                          {" "}
                          {booking.rental.title} -{" "}
                          {toUpperCase(booking.rental.city)}
                        </h4>
                        <p className="card-text booking-desc">
                          {booking.rental.description}
                        </p>
                      </React.Fragment>
                    )}
                    <p className="card-text booking-days">
                      {booking.startAt} - {booking.endAt} | {booking.days} days
                    </p>
                    <p className="card-text booking-price">
                      <span>Price: </span>{" "}
                      <span className="booking-price-value">
                        ${booking.totalPrice}
                      </span>
                    </p>
                    {booking.rental && (
                      <Link
                        className="btn btn-bwm"
                        to={`/rentals/${booking.rental._id}`}
                      >
                        Go to Rental
                      </Link>
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    Created {booking.createdAt}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="alert alert-warning">
          You have no bookings. Go to rentals section and book your place today.
          <Link
            style={{ marginLeft: "10px" }}
            className="btn btn-bwm"
            to="rentals index page"
          >
            Available Rental
          </Link>
        </div>
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
