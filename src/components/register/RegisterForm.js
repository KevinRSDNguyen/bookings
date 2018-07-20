import React from "react";
import { Field, reduxForm } from "redux-form";

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-group">
      <input {...input} type={type} className={className} />
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCb } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={renderField}
      />

      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={renderField}
      />

      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={renderField}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={renderField}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={pristine || submitting}
      >
        Submit
      </button>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = "Username min length is 4 characters!";
  }

  if (!values.email) {
    errors.email = "Please enter email!";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter password confirmation!";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords must be the same";
  }

  return errors;
};

export default reduxForm({
  form: "registerForm", // a unique identifier for this form
  validate
})(RegisterForm);
