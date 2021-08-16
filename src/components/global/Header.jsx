import React, { Component } from "react";
import "./Header.css";

// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link className="logo-link" to="/">
          <img src="/img/logo.svg" className="Logo" alt="Logo" />
        </Link>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">
                <img src="/img/cage.svg" alt="home" />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/battle">
                <img src="/img/swords.svg" alt="home" />
                <p>Battle</p>
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                <img src="/img/gallery.svg" alt="home" />
                <p className="gallery">Gallery</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Header;
