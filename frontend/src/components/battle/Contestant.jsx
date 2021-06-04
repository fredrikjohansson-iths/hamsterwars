import React, { Component } from "react";
import "./Contestant.css";

class Contestant extends Component {
  render() {
    console.log(this.props.hamsterData)

    return (
      <div className={`grid-container-profile ${this.props.grid}`}>
        <div>
          <img
            src={`${this.props.imgSrc}`}
            className={` avatar ${this.props.grid}-img `}
            alt="avatar"
          />
        </div>
        <div className={`${this.props.grid}-bio`}>
          <ul className="facts">
            <h1>about</h1>
            <li>My name is <span>{this.props.hamsterData.name}</span></li>
            <li>I'm <span>{this.props.hamsterData.age}</span> years old</li>
            <li>My favourite food is <span>{this.props.hamsterData.favFood}</span></li>
            <li className="loves">I love to <span>{this.props.hamsterData.loves}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Contestant;
