import React, { Component } from "react";
import * as actions from "actions";

class RentalManage extends Component {
  state = {
    userRentals: [],
    errors: [],
    isFetching: false
  };
  componentDidMount() {
    this.setState({ isFetching: true });

    actions
      .getUserRentals()
      .then(userRentals => this.setState({ userRentals, isFetching: false }))
      .catch(errors => this.setState({ errors, isFetching: false }));
  }
  render() {
    const { userRentals, isFetching } = this.state;
    return (
      <div>
        {userRentals.map((rental, index) => {
          return <p key={rental._id}>{rental.title}</p>;
        })}
      </div>
    );
  }
}

export default RentalManage;
