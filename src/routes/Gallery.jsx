import React, { Component } from "react";
import Thumbnail from "../components/gallery/Thumbnail";
import "./Gallery.css";

const axios = require("axios");

class HamsterGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamsters: null,
      selectedHamster: null,
      newHamster: {
        name: "",
        age: 0,
        favFood: "",
        loves: "",
        imgName: "",
      },
      showMenu: false,
      showAddNew: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteHamster = this.deleteHamster.bind(this);
    this.createHamster = this.createHamster.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:8000/hamsters/").then((response) => {
      this.setState({ hamsters: response.data });
    });
  }
  handleChange(event) {
    this.setState(
      (prevState) => ({
        newHamster: {
          ...prevState.newHamster,
          [event.target.id]: event.target.value,
        },
      }),
      () => {
        console.log(this.state.newHamster);
      }
    );
  }
  handleClick(hamster) {
    this.setState({ selectedHamster: hamster });
    this.setState({ showMenu: true });
  }

  handleError(e) {
    e.target.src = "na.jpg";
  }

  hideMenu() {
    this.setState({ showMenu: false });
  }
  toggleAddNew() {
    if (this.state.showAddNew) {
      this.setState({ showAddNew: false });
    } else {
      this.setState({ showAddNew: true });
    }
  }
  createHamster(event) {
    event.preventDefault();
    var hamster = this.state.newHamster;
    var uri = `http://localhost:8000/hamsters/`;
    axios.post(uri, hamster).then((response) => {
      this.setState({ showAddNew: false });
    });
  }
  deleteHamster() {
    var uri = `http://localhost:8000/hamsters/${this.state.selectedHamster[0].docId}`;
    axios.delete(uri).then((response) => {
      console.log(response);
    });
    this.setState({ showMenu: false, selectedHamster: [] });
    window.location.reload();
  }
  render() {
    if (!this.state.hamsters) {
      return "Loading hamsters...";
    }

    return (
      <div>
        <div className={` ${this.state.showAddNew ? "hidden" : ""} `}>
          <p onClick={this.toggleAddNew} className="add-text">
            {" "}
            <i className={`plus fas fa-plus`} />
            Add new hamster
          </p>
        </div>
        <div className={` new ${this.state.showAddNew ? "" : "hidden"}`}>
          <form onSubmit={this.createHamster}>
            <i onClick={this.toggleAddNew} className="close fas fa-times" />
            <label htmlFor="name">Name</label>
            <input
              value={this.state.newHamster.name}
              onChange={this.handleChange}
              id="name"
              type="text"
            />
            <label htmlFor="age">Age</label>
            <input
              value={this.state.newHamster.age}
              onChange={this.handleChange}
              id="age"
              type="number"
            />
            <label htmlFor="favFood">Favourite food</label>
            <input
              value={this.state.newHamster.favFood}
              onChange={this.handleChange}
              id="favFood"
              type="text"
            />
            <label htmlFor="loves">Loves</label>
            <input
              value={this.state.newHamster.loves}
              onChange={this.handleChange}
              id="loves"
              type="text"
            />
            <label htmlFor="imgName">Image source</label>
            <input
              value={this.state.newHamster.imgName}
              onChange={this.handleChange}
              id="imgName"
              type="text"
            />
            <input type="submit" />
          </form>
        </div>
        <div className={`menu-bkg ${this.state.showMenu ? "" : "hidden"}`}>
          <div>
            <img
            onError={this.handleError}
              src={
                this.state.selectedHamster
                  ? this.state.selectedHamster.imgName
                  : ""
              }
              alt="selected"
            />
            {this.state.showMenu && this.state.selectedHamster ? (
              <div className="flex-container">
                <div>
                <ul className="about">
                  <label htmlFor="selectedName">Name</label>
                  <li id="selectedName">{this.state.selectedHamster.name}</li>
                  <label htmlFor="selectedAge">Age</label>
                  <li id="selectedAge">{this.state.selectedHamster.age}</li>
                  <label htmlFor="selectedFav">Favourite food</label>
                  <li id="selectedFav">{this.state.selectedHamster.favFood}</li>
                  <label htmlFor="selectedLoves">Loves</label>
                  <li id="selectedLoves">{this.state.selectedHamster.loves}</li>
                  <label htmlFor="selectedImg">Image source</label>
                  <li id="selectedImg">{this.state.selectedHamster.imgName}</li>
                </ul></div>
                <div>
                  {" "}
                  <h1
                    className={`menu-text ${
                      this.state.showMenu ? "" : "hidden"
                    }`}
                  >
                    Delete this hamster?
                  </h1>
                  <button onClick={this.deleteHamster}>Yes</button>
                  <button onClick={this.hideMenu}>No</button>
                </div>
              </div>
            ) : (
              ""
            )}{" "}
          </div>
        </div>{" "}
        <div className="thumb-grid">
          <div className="col-A">
            {" "}
            {this.state.hamsters.slice(0, 9).map((hamster) => (
              <Thumbnail
                index={this.state.hamsters.indexOf(hamster)}
                key={hamster.docId}
                onClick={this.handleClick}
                hamsterData={hamster}
              />
            ))}
          </div>
          <div className="col-B">
            {" "}
            {this.state.hamsters.slice(10, 19).map((hamster) => (
              <Thumbnail
                index={this.state.hamsters.indexOf(hamster)}
                key={hamster.docId}
                onClick={this.handleClick}
                hamsterData={hamster}
              />
            ))}
          </div>
          <div className="col-C">
            {" "}
            {this.state.hamsters.slice(20, 29).map((hamster) => (
              <Thumbnail
                index={this.state.hamsters.indexOf(hamster)}
                key={hamster.docId}
                onClick={this.handleClick}
                hamsterData={hamster}
              />
            ))}
          </div>
          <div className="col-D">
            {" "}
            {this.state.hamsters.slice(30).map((hamster) => (
              <Thumbnail
                index={this.state.hamsters.indexOf(hamster)}
                key={hamster.docId}
                onClick={this.handleClick}
                hamsterData={hamster}
              />
            ))}
          </div>
          {/* {this.state.hamsters.map((hamster) => (
            <Thumbnail
              index={this.state.hamsters.indexOf(hamster)}
              key={hamster.docId}
              onClick={this.handleClick}
              hamsterData={hamster}
            />
          ))} */}
        </div>
      </div>
    );
  }
}

export default HamsterGallery;
