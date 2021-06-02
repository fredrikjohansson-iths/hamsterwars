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
    axios
      .get("http://localhost:8000/hamsters/")
      .then((response) => {
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

        var testURI = "http://localhost:8000/hamsters/"+`${this.state.blueId}`
        console.log(testURI)
        axios
        .get(testURI)
        .then((response) => {
          console.log(response.data)
          // this.setState({
          //   blueContestant: response.data,
          // });
        })
        .catch((error) => console.log(error));

        // console.log("Blue", this.state.blueId, "Red", this.state.blueId);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });


  //   axios
  //     .get(`http://localhost:8000/hamsters/${this.state.redId}`)
  //     .then((response) => {
  //       this.setState({
  //         blueContestant: response.data,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  }
  // componentDidUpdate(){console.log(this.state)}
  render() {
    return (
      <div>
        <Versus
        // nameLeft={this.state.hamsterLeft.name}
        // nameRight={this.state.hamsterRight.name}
        ></Versus>
        <Competitor />
      </div>
    );
  }
}

export default Battle;
