import React, { Component } from "react";
import Thumbnail from "../components/gallery/Thumbnail";
import "./Gallery.css";

const axios = require("axios");

class HamsterGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hamsters: null,
			selectedHamster: [],
			showMenu: false
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.deleteHamster = this.deleteHamster.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}
	componentDidMount() {
		axios.get("http://localhost:8000/hamsters/").then((response) => {
			this.setState({ hamsters: response.data });
		});
	}
	handleClick(hamster) {
		this.setState({ selectedHamster: [hamster] });
		this.setState({ showMenu: true });
	}

	hideMenu() {
		this.setState({ showMenu: false });
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
				<div>
					<form>
						<label htmlFor="name">Name</label>
						<input id="name" type="text" />
						<label htmlFor="name">Age</label>
						<input id="name" type="number" />
						<label htmlFor="name">Favourite food</label>
						<input id="name" type="text" />
						<label htmlFor="name">Loves</label>
						<input id="name" type="text" />
						<label htmlFor="name">Upload image</label>
						<input id="name" type="file" />
					</form>
				</div>
				<div className={`menu-bkg ${this.state.showMenu ? "" : "hidden"}`}>
					<div>
						<img
							src={this.state.selectedImg ? this.state.selectedImg : ""}
							alt="selected"
						/>

						{this.state.showMenu ? this.state.selectedHamster : ""}
						<div>
							{this.state.selectedHamster.map((hamster) => {
								return (
									<p>
										{hamster.name}
										{hamster.age}
										{hamster.loves}
										{hamster.favFood}
									</p>
								);
							})}
						</div>
						<h1 className={`menu-text ${this.state.showMenu ? "" : "hidden"}`}>
							Delete this hamster?
						</h1>
						<button onClick={this.deleteHamster}>Yes</button>
						<button onClick={this.hideMenu}>No</button>
					</div>
				</div>{" "}
				<div className="gallery-grid">
					{this.state.hamsters.map((hamster) => (
						<Thumbnail
							key={hamster.docId}
							onClick={this.handleClick}
							hamsterData={hamster}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default HamsterGallery;
