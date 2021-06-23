import React, { Component } from "react";
// import Thumbnail from "../components/gallery/Thumbnail";
import Gallery from "react-photo-gallery";
import "./Gallery.css";

const axios = require("axios");

class HamsterGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hamsters: null,
			selectedHamster: [],
			selectedImg: null,
			showMenu: false
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.deleteHamster = this.deleteHamster.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}
	componentDidMount() {
		axios
			.get("http://localhost:8000/hamsters/")
			.then((response) => {
				this.setState({ hamsters: response.data });
			});
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

		const photos = [];
		this.state.hamsters.forEach((hamster) => {
			photos.push({
				src: hamster.imgName,
				width: 1,
				height: 1,
				id: hamster.docId,
				className: "thumbnail"
			});
			setTimeout(() => {
				document.getElementById(hamster.docId).addEventListener("click", () => {
					var uri = `http://localhost:8000/hamsters/${hamster.docId}`;
					axios.get(uri).then((response) => {
						this.state.selectedHamster.push(hamster);
						this.setState({ selectedImg: hamster.imgName });
					});
					this.setState({ showMenu: true });
				});
			}, 500);
		});

		return (
			<div>
				<div>
					<form>
						<label for="name">Name</label>
						<input id="name" type="text" />
						<label for="name">Age</label>
						<input id="name" type="number" />
						<label for="name">Favourite food</label>
						<input id="name" type="text" />
						<label for="name">Loves</label>
						<input id="name" type="text" />
						<label for="name">Upload image</label>
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
						<h1 className={`menu-text ${this.state.showMenu ? "" : "hidden"}`}>
							Delete this hamster?
						</h1>
						<button onClick={this.deleteHamster}>Yes</button>
						<button onClick={this.hideMenu}>No</button>
					</div>
				</div>{" "}
				<Gallery photos={photos} />;
				{/* {this.state.hamsters.map((hamster) => { 
					return <Thumbnail key={hamster.docId} hamsterData={hamster} />;
				})} */}
			</div>
		);
	}
}

export default HamsterGallery;
