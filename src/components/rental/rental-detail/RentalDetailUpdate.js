import React, { Component } from "react";
import { connect } from "react-redux";
import RentalAssets from "./RentalAssets";
import { toUpperCase } from "helpers";
import { toast } from "react-toastify";

import EditableInput from "./../../shared/editable/EditableInput";
import EditableTextArea from "./../../shared/editable/EditableTextArea";
import EditableSelect from "../../shared/editable/EditableSelect";

import { updateRental, resetRentalErrors } from "actions/index";

class RentalDetailUpdate extends Component {
  updateRental = rentalData => {
    const {
      rental: { _id }
    } = this.props;
    this.props.updateRental(_id, rentalData);
  };
  resetRentalErrors = () => {
    this.props.resetRentalErrors();
  };
  render() {
    const { rental, errors } = this.props;
    if (errors && errors.length > 0) {
      toast.error(errors[0].detail);
    }
    return (
      <div className="rental">
        <label className={`rental-label rental-type ${rental.category}`}>
          {" "}
          Shared{" "}
        </label>
        <EditableSelect
          entity={rental}
          entityField={"shared"}
          updateEntity={this.updateRental}
          options={[true, false]}
          className={`rental-type ${rental.category}`}
          containerStyle={{ display: "inline-block" }}
          errors={errors}
          resetErrors={this.resetRentalErrors}
        />

        <EditableSelect
          entity={rental}
          entityField={"category"}
          updateEntity={this.updateRental}
          options={["apartment", "house", "condo"]}
          className={`rental-type ${rental.category}`}
          errors={errors}
          resetErrors={this.resetRentalErrors}
        />
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
          errors={errors}
          resetErrors={this.resetRentalErrors}
        />
        <EditableInput
          entity={rental}
          entityField={"city"}
          updateEntity={this.updateRental}
          className={"rental-city"}
          errors={errors}
          formatPipe={[toUpperCase]}
          resetErrors={this.resetRentalErrors}
        />
        <EditableInput
          entity={rental}
          entityField={"street"}
          updateEntity={this.updateRental}
          className={"rental-street"}
          errors={errors}
          resetErrors={this.resetRentalErrors}
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
              errors={errors}
              resetErrors={this.resetRentalErrors}
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
          errors={errors}
          resetErrors={this.resetRentalErrors}
        />
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default connect(
  null,
  { updateRental, resetRentalErrors }
)(RentalDetailUpdate);
