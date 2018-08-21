import React from "react";

class EditableComponent extends React.Component {
  state = {
    isActive: false, //Toggle whether we are viewing or editing
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
