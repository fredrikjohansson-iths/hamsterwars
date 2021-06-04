import React, { Component } from "react";
import "./Vote.css";

class Vote extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleClick() {}
	render() {
		return (
			<button className={`${this.props.hamster}-vote`}>
				<p> Vote</p>{" "}
			</button>
		);
	}
}
export default Vote;
