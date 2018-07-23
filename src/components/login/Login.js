import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "actions";

class Login extends Component {
  submitCb = userData => {
    this.props.login(userData);
  };
  render() {
    const { isAuth, errors } = this.props.auth;

    if (isAuth) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }
    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              <LoginForm submitCb={this.submitCb} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places just in reach of a few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/login-image.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
