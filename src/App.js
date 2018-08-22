import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Header from "components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalSearchListing from "components/rental/rental-listing/RentalSearchListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import RentalCreate from "components/rental/rental-create/RentalCreate";
import Login from "components/login/Login";
import Register from "components/register/Register";

import RentalManage from "components/rental/rental-manage/RentalManage";
import BookingManage from "components/booking/booking-manage/BookingManage";

import ProtectedRoute from "components/shared/auth/ProtectedRoute";
import LoggedInRoute from "components/shared/auth/LoggedInRoute";

import { checkAuthState, logout } from "actions";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header logout={this.logout} />
        <div className="container">
          <Switch>
            <Route exact path="/rentals" component={RentalListing} />
            <Route
              exact
              path="/rentals/:city/homes"
              component={RentalSearchListing}
            />
            <ProtectedRoute
              exact
              path="/rentals/manage"
              component={RentalManage}
            />
            <ProtectedRoute
              exact
              path="/bookings/manage"
              component={BookingManage}
            />
            <ProtectedRoute
              exact
              path="/rentals/new"
              component={RentalCreate}
            />
            <Route exact path="/rentals/:id" component={RentalDetail} />
            <Route exact path="/login" component={Login} />
            <LoggedInRoute exact path="/register" component={Register} />
            <Redirect to="/rentals" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { checkAuthState, logout }
  )(App)
);
