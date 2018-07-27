import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ToastContainer, toast } from "react-toastify";
import BookingModal from "./BookingModal";
import { getRangeOfDates } from "helpers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap-daterangepicker/daterangepicker.css";

import * as moment from "moment";
import * as actions from "actions";

class Booking extends Component {
  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();
    //Used refs to set input value of start and end dates

    this.state = {
      proposedBooking: {
        startAt: "",
        endAt: "",
        guests: ""
      },
      modal: {
        open: false
      },
      errors: []
    };
  }
  componentDidMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates = () => {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt,
          "Y-MM-DD"
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  };
  addNewBookedOutDates = booking => {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  };
  checkInvalidDates = date => {
    //Used to block out dates
    return (
      this.bookedOutDates.includes(date.format("Y-MM-DD")) ||
      date.diff(moment(), "days") < 0 // Or if date is in the past
    );
  };
  handleApply = (event, picker) => {
    const startAt = picker.startDate.format("Y-MM-DD");
    const endAt = picker.endDate.format("Y-MM-DD");

    this.dateRef.current.value = startAt + " to " + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  };
  selectGuests = event => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    });
  };
  cancelConfirmation = () => {
    this.setState({
      modal: {
        open: false
      }
    });
  };
  resetData = () => {
    this.dateRef.current.value = "";

    this.setState({ proposedBooking: { guests: "", startAt: "", endAt: "" } });
  };
  confirmProposedData = () => {
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  };
  reserveRental = () => {
    actions.createBooking(this.state.proposedBooking).then(
      booking => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation(); // Closes Modal
        this.resetData();
        toast.success("Booking has been succesfuly created! Enjoy.");
      },
      errors => {
        this.setState({ errors });
      }
    );
  };
  render() {
    const {
      rental,
      auth: { isAuth }
    } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;
    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          ${rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr />
        {!isAuth && ( //Display Login button to reserve
          <Link
            className="btn btn-bwm btn-confirm btn-block"
            to={{ pathname: "/login" }}
          >
            Login to book place.
          </Link>
        )}
        {isAuth && ( //Only display reserve inputs if user logged in
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                onApply={this.handleApply}
                isInvalidDate={this.checkInvalidDates}
                opens="left"
                containerStyles={{ display: "block" }}
              >
                <input
                  ref={this.dateRef}
                  id="dates"
                  type="text"
                  className="form-control"
                />
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                onChange={this.selectGuests}
                value={guests}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
            <button
              onClick={this.confirmProposedData}
              className="btn btn-bwm btn-confirm btn-block"
              disabled={!startAt || !endAt || !guests}
            >
              Reserve place now
            </button>
          </React.Fragment>
        )}
        <hr />
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          open={this.state.modal.open}
          closeModal={this.cancelConfirmation}
          confirmModal={this.reserveRental}
          booking={this.state.proposedBooking}
          errors={this.state.errors}
          rentalPrice={rental.dailyRate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Booking);
