import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Header from "components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import Login from "components/login/Login";
import Register from "components/register/Register";

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
        <Header logout={this.logout} />
        <div className="container">
          <Switch>
            <Route exact path="/rentals" component={RentalListing} />
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
