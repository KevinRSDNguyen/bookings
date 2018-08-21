import React, { Component } from "react";
import { connect } from "react-redux";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalDetailUpdate from "./RentalDetailUpdate";
import RentalMap from "./RentalMap";
import Booking from "components/booking/Booking";
import { fetchRentalById } from "actions/index";

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.fetchRentalById(rentalId);
  }
  renderRentalDetail(rental) {
    const { isUpdate } = this.props.location.state || false; //Given to us by rrd

    return isUpdate ? (
      <RentalDetailUpdate rental={rental} />
    ) : (
      <RentalDetailInfo rental={rental} />
    );
  }
  render() {
    const { rental } = this.props;

    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">{this.renderRentalDetail(rental)}</div>
              <div className="col-md-4">
                {" "}
                <Booking rental={rental} />
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentalById }
)(RentalDetail);
