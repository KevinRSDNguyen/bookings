import React from "react";

const BwmSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error, warning }
}) => {
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {" "}
          {option}{" "}
        </option>
      );
    });
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <select {...input} className={className}>
          {renderOptions()}
        </select>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};

export default BwmSelect;
