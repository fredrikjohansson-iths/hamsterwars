import React, { Component } from "react";
import Versus from "../components/battle/Versus";
import Competitor from "../components/battle/Competitor";
const axios = require("axios");

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {blueId: Number, blueContestant: Object, redId: Number, redContestant: Object };
  }
  componentDidMount() {

      const[blueData, redData] = await Promise.all([
          axios.get("http://localhost:8000/hamsters/random"),
          axios.get("http://localhost:8000/hamsters/random")
      ])

      while (blueData.data.id === redData.data.id){
            blueData = axios.get("http://localhost:8000/hamsters/random")

      }
    // axios
    //   .get("http://localhost:8000/hamsters/random")
    //   .then((response) => {
    //     // handle success
    //     this.setState({blueId: response.data.id, blueContestant: response.data });
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function(){
        
    //   })

  }
  render() {
    return (
      <div>
        <Versus
          nameLeft={this.state.hamsterLeft.name}
          nameRight={this.state.hamsterRight.name}
        ></Versus>
        <Competitor />
      </div>
    );
  }
}

export default Battle;
