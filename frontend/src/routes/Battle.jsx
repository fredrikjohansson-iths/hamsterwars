import React, { Component } from "react";
import Versus from "../components/battle/Versus";
import Contestant from "../components/battle/Contestant";
import Vote from "../components/battle/Vote"

const axios = require("axios");

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueId: null,
      blueContestant: null,
      redId: null,
      redContestant: null,
      isReady: false
    };
    this.blueVote=this.blueVote.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var floor = 0;
    axios.get("http://localhost:8000/hamsters/").then((response) => {
      // handle success

      floor = response.data.length - 1;

      var blueRng = Math.floor(Math.random() * floor);

      var redRng = Math.floor(Math.random() * floor);

      if (redRng === blueRng || blueRng === redRng) {
        redRng = 0;
        redRng = Math.floor(Math.random() * floor);

        this.setState({ blueId: response.data[blueRng].docId, redId: response.data[redRng].docId });

      } else {

        this.setState({ blueId: response.data[blueRng].docId, redId: response.data[redRng].docId });

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
  }
  blueVote() {
    const body = {
      "wins": this.state.blueContestant.wins + 1,
      "defeats": this.state.blueContestant.defeats,
      "games": this.state.blueContestant.games + 1
    }

    const uri = `http://localhost:8000/hamsters/${this.state.blueId}`

    axios.put(uri, body)
  }
  render() {
    const blue = this.state.blueContestant;
    const red = this.state.redContestant;
    const isReady = this.state.isReady;

    if (!blue || !red) {
      return 'Loading...'
    }

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
        <Vote hamster="blue"/>
        <Vote hamster="red"/>
      </div>
    );
  }
}

export default Battle;
