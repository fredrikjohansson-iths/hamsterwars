import React, { Component } from "react";
import Versus from "../components/battle/Versus";
import Competitor from "../components/battle/Competitor";
const axios = require("axios");

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueId: Number,
      blueContestant: Object,
      redId: Number,
      redContestant: Object,
    };
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
    });
  }

  render() {
    return (
      <div>
        <Versus
        // nameLeft={this.state.blueCompetitor.name}
        // nameRight={this.state.redCompetitor.name}
        ></Versus>
        <Competitor />
      </div>
    );
  }
}

export default Battle;
