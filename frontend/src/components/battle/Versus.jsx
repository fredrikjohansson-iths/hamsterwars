import React, { Component } from "react";
import "./Versus.css";

const NameSign = ({ className, name }) => {
  return <h1 className={className}>{name}</h1>;
};

class Versus extends Component {
  render() {
    return (
      <div className="Versus">
        <NameSign className="Left" name={this.props.nameLeft} />
        <NameSign className="Right" name={this.props.nameLeft} />
      </div>
    );
  }
}
export default Versus;
