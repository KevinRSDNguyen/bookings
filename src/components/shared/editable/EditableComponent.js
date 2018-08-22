import React from "react";

class EditableComponent extends React.Component {
  state = {
    isActive: false, //Toggle whether we are viewing or editing
    value: undefined,
    originValue: undefined //Prevent AJAX request if same value as original
  };
  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate() {
    const { errors, entityField, resetErrors } = this.props;

    if (errors && errors.length > 0 && errors[0].title === entityField) {
      this.setOriginValue(); //Calls setState which triggers CDU again errors props has not changed and can have infinite loop
      resetErrors();
    }
  }

  setOriginValue() {
    const { entity, entityField } = this.props;

    this.setState({
      value: entity[entityField],
      originValue: entity[entityField],
      isActive: false
    });
  }
  disableEdit = () => {
    this.setState({ isActive: false });
  };
  enableEdit = () => {
    this.setState({ isActive: true });
  };
  update = () => {
    const { value, originValue } = this.state;
    const { updateEntity, entityField } = this.props;

    if (value !== originValue) {
      updateEntity({ [entityField]: value });
      this.setState({ isActive: false, originValue: value });
    }
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
}

export default EditableComponent;
