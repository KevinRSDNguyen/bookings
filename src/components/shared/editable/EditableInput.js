import React, { Component } from "react";

class EditableInput extends Component {
  state = {
    isActive: false,
    value: undefined,
    originValue: undefined
  };
  componentDidMount() {
    //Entity is rental object. Entityfield could be title, city, etc
    const { entity, entityField } = this.props;
    const value = entity[entityField];

    this.setState({
      value,
      originValue: value
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <input value={value} />
      </div>
    );
  }
}

export default EditableInput;
