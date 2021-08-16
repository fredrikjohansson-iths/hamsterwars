import React, { Component } from "react";
import "./Contestant.css";


class Contestant extends Component {



  capitalizeFirstLetter(string) {
    if (string === undefined)
    {string = ''}
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {

    return (
      <div className={`grid-container-profile ${this.props.grid}`}>
        <div>
          <img
            src={`img/${this.props.imgSrc}`}
            className={` avatar ${this.props.grid}-img `}
            alt="avatar"
          />
        </div>
        <div className={`${this.props.grid}-bio`}>
          <ul className="facts">
          <i className="fas fa-info-circle"></i>
            <li>
              <i className="fas fa-birthday-cake"></i>Age
              <span>
                <br />
                {this.props.hamsterData.age}
              </span>{" "}
              years old
            </li>
            <li>
              <i className="fas fa-utensils"></i>Favourite food
              <br />
              <span>{this.capitalizeFirstLetter(this.props.hamsterData.favFood)}</span>
            </li>
            <li className="loves">
              <i className="fas fa-heart"></i>Loves to
              <br /> <span>{this.capitalizeFirstLetter(this.props.hamsterData.loves)}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Contestant;
