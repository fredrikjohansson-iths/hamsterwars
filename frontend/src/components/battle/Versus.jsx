import React, { Component } from "react";
import "./Versus.css";

const NameSign = ({ className, name }) => {
  return <h1 className={className}>{name}</h1>;
};

class Versus extends Component {
  render() {
    return (
      <div className={`versus grid-container ${this.props.grid}`}>
        <NameSign className={"left"} name={this.props.blueName} />
        <NameSign className={"right"} name={this.props.redName} />
      </div>
    );
  }
}
export default Versus;
