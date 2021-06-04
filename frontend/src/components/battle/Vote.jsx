import React, { Component } from "react";
import "./Vote.css";

class Vote extends Component {
	render() {
		return (
			<button onClick={this.submitVote()} className={`${this.props.hamster}-vote`}>
				<p>Vote</p>
			</button>
		);
	}
}
export default Vote;
