import React, { Component } from "react";
import Versus from "../components/battle/Versus";
import Contestant from "../components/battle/Contestant";

const axios = require("axios");

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueId: Number,
      blueContestant: Object,
      redId: Number,
      redContestant: Object,
      isReady: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var floor = 0;
    axios.get("http://localhost:8000/hamsters/").then((response) => {
      // handle success

      floor = response.data.length;

      var blueRng = Math.floor(Math.random() * floor);

      var redRng = Math.floor(Math.random() * floor);

      if (redRng === blueRng || blueRng === redRng) {
        redRng = 0;
        redRng = Math.floor(Math.random() * floor);

        this.setState({ blueId: blueRng, redId: redRng });
      } else {
        this.setState({ blueId: blueRng, redId: redRng });
      }
      if (this.state.blueId && this.state.redId) {
        const blueURI = `http://localhost:8000/hamsters/${this.state.blueId}`;
        const redURI = `http://localhost:8000/hamsters/${this.state.redId}`;
        axios.get(blueURI).then((response) => {
          this.setState({ blueContestant: response.data });
        });
        axios.get(redURI).then((response) => {
          this.setState({ redContestant: response.data });
        });
      }
    });
    this.setState(() => {
      setTimeout(() => this.setState({ isReady: true }), 800);
    });
  }
  render() {
    const blue = this.state.blueContestant;
    const red = this.state.redContestant;
    const isReady = this.state.isReady;

    return (
      <div className="grid-container-battle">
        <Versus
          grid="banner"
          className="banner"
          blueName={blue.name}
          redName={red.name}
        />
        <Contestant
          hamsterData={blue}
          grid="blue-profile"
          imgSrc={`${blue.imgName}`}
          isReady={`${isReady}`}
        />
        <Contestant
          hamsterData={red}
          grid="red-profile"
          imgSrc={`${red.imgName}`}
          isReady={`${isReady}`}
        />
      </div>
    );
  }
}

export default Battle;
