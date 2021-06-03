import React, { Component } from "react";
import "./Contestant.css";

class Contestant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isReady = this.props.isReady;
    

    return (
      <div className={`grid-container-profile ${this.props.grid}`}>
        <div>
          <img
            src={`${this.props.imgSrc}`}
            className={` avatar ${this.props.grid}-img ${
              isReady ? "" : "Hide"
            }`}
            alt="avatar"
          />
        </div>
        <div className={`${this.props.grid}-bio`}>
          <ul>
          </ul>
        </div>
      </div>
    );
  }
}
export default Contestant;
