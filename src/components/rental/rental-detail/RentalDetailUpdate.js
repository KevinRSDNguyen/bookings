import React, { Component } from "react";
import { connect } from "react-redux";
import RentalAssets from "./RentalAssets";
import { toUpperCase, rentalType } from "helpers";

import EditableInput from "./../../shared/editable/EditableInput";
import EditableTextArea from "./../../shared/editable/EditableTextArea";
import { updateRental } from "actions";

class RentalDetailUpdate extends Component {
  updateRental = rentalData => {
    const {
      rental: { _id }
    } = this.props;
    this.props.updateRental(_id, rentalData);
  };
  render() {
    const { rental } = this.props;
    return (
      <div className="rental">
        <h2 className={`rental-type ${rental.category}`}>
          {rentalType(rental.shared)} {rental.category}
        </h2>
        <div className="rental-owner">
          <img
            src="https://api.adorable.io/avatars/285/abott@adorable.png"
            alt="owner"
          />
          <span>{rental.user && rental.user.username}</span>
        </div>
        <EditableInput
          entity={rental}
          entityField={"title"}
          updateEntity={this.updateRental}
          className={"rental-title"}
        />
        <EditableInput
          entity={rental}
          entityField={"city"}
          updateEntity={this.updateRental}
          className={"rental-city"}
        />
        <EditableInput
          entity={rental}
          entityField={"street"}
          updateEntity={this.updateRental}
          className={"rental-street"}
        />
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building" />
            <EditableInput
              entity={rental}
              entityField={"bedrooms"}
              updateEntity={this.updateRental}
              className={"rental-bedrooms"}
              containerStyle={{ display: "inline-block" }}
            />{" "}
            bedrooms
          </span>
          <span>
            <i className="fa fa-user" /> {rental.bedrooms + 4} guests
          </span>
          <span>
            <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
          </span>
        </div>
        {/* <p className="rental-description">{rental.description}</p> */}
        <EditableTextArea
          entity={rental}
          entityField={"description"}
          updateEntity={this.updateRental}
          className={"rental-description"}
          rows={6}
          cols={50}
        />
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default connect(
  null,
  { updateRental }
)(RentalDetailUpdate);
