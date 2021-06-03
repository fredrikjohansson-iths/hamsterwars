import React, { Component } from "react";
import Thumbnail from "../components/gallery/Thumbnail";

const axios = require("axios");

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = { hamsters: null };
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		axios.get("http://localhost:8000/hamsters/").then((response) => {
			this.setState({ hamsters: response.data });
		});
	}
	render() {
		if (!this.state.hamsters) {
			return "Loading hamsters";
		}

		return (
			<div>
				{this.state.hamsters.map((hamster) => {
					return <Thumbnail key={hamster.docId} hamsterData={hamster} />;
				})}
			</div>
		);
	}
}

export default Gallery;
