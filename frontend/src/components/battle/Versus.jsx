import React, { Component } from "react";
import "./Versus.css";

const NameSign = ({ className, name }) => {
  return <h1 className={className}>{name}</h1>;
};

class Versus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
    // this.timedToggle = this.timedToggle.bind(this);
  }
  componentDidMount() {
    this.setState(() => {
      setTimeout(() => this.setState({ isReady: true }), 1000);
    });
  }
  render() {
    const isReady = this.state.isReady;
    return (
      <div className={`versus grid-container ${this.props.grid}`}>
        <NameSign
          className={`left ${isReady ? "" : "Hide"}`}
          name={this.props.blueName}
        />
        <NameSign
          className={`right ${isReady ? "" : "Hide"}`}
          name={this.props.redName}
        />
      </div>
    );
  }
}
export default Versus;
