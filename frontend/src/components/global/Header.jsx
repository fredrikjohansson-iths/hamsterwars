import React, { Component } from "react";
import "./Header.css";
import logo from "./logo.svg";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">
          <img src={logo} className="Logo" alt="Logo" />
        </Link>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">
                <img src="cage.svg" alt="home" />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/battle">
                <img src="swords.svg" alt="home" />
                <p>Battle</p>
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                <img src="gallery.svg" alt="home" />
                <p>Gallery</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Header;
