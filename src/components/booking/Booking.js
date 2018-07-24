import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeOfDates } from "helpers";
import "bootstrap-daterangepicker/daterangepicker.css";

import * as moment from "moment";

class Booking extends Component {
  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

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
          "Y/MM/DD"
        );
        this.bookedOutDates.push(...dateRange);
        console.log(this.bookedOutDates);
      });
    }
  };
  checkInvalidDates = date => {
    //Used to block out dates
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0 // Or if date is in the past
    );
  };
  render() {
    const { rental } = this.props;
    return (
      <div className="booking">
        <h3 className="booking-price">
          ${rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr />
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
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="emailHelp"
            placeholder=""
          />
        </div>
        <button className="btn btn-bwm btn-confirm btn-block">
          Reserve place now
        </button>
        <hr />
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
      </div>
    );
  }
}

export default Booking;
