import React, { Component } from "react";
import "./Contestant.css";

class Contestant extends Component {
  render() {
    console.log(this.props.hamsterData)



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
            <li>My favorite food is {this.props.hamsterData.favFood}</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Contestant;
