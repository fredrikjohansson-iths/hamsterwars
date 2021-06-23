import React, { Component } from "react";
import Versus from "../components/battle/Versus";
import Contestant from "../components/battle/Contestant";
// import Vote from "../components/battle/Vote"

const axios = require("axios");

class Battle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blueId: null,
			blueContestant: null,
			blueResults: {
				blueWins: null,
				blueDefeats: null,
				blueGames: null
			},
			redId: null,
			redContestant: null,
			redResults: {
				redWins: null,
				redDefeats: null,
				redGames: null
			},
			showResults: false
		};
		this.getResults = this.getResults.bind(this);
		this.submitVote = this.submitVote.bind(this);
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

				this.setState({
					blueId: response.data[blueRng].docId,
					redId: response.data[redRng].docId
				});
			} else {
				this.setState({
					blueId: response.data[blueRng].docId,
					redId: response.data[redRng].docId
				});
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

	getResults() {
		const blueURI = `http://localhost:8000/hamsters/${this.state.blueId}`;
		const redURI = `http://localhost:8000/hamsters/${this.state.redId}`;

		this.setState({ showResults: true });
		setTimeout(function(){ window.location.reload(); }, 10000);

		axios.get(blueURI).then((response) => {
			this.setState({
				blueWins: response.data.wins,
				blueDefeats: response.data.defeats,
				blueGames: response.data.games
			});
		});
		axios.get(redURI).then((response) => {
			this.setState(
				{
					redWins: response.data.wins,
					redDefeats: response.data.defeats,
					redGames: response.data.games
				},
				() => {
					console.log(response);
				}
			);
		});
	}
	submitVote(winner) {

		var blueBody = {
			wins: this.state.blueContestant.wins,
			defeats: this.state.blueContestant.defeats,
			games: this.state.blueContestant.games
		};

		var redBody = {
			wins: this.state.redContestant.wins,
			defeats: this.state.redContestant.defeats,
			games: this.state.redContestant.games
		};

		if (winner === "blue") {
			blueBody.wins++;
			blueBody.games++;

			redBody.defeats++;
			redBody.games++;
		}

		if (winner === "red") {
			redBody.wins++;
			redBody.games++;

			blueBody.defeats++;
			blueBody.games++;
		}

		const blueURI = `http://localhost:8000/hamsters/${this.state.blueId}`;
		const redURI = `http://localhost:8000/hamsters/${this.state.redId}`;

		axios
			.put(blueURI, blueBody)
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		axios
			.put(redURI, redBody)
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

			this.getResults()
	}

	render() {
		var blue = this.state.blueContestant;
		var red = this.state.redContestant;
		var results = (this.state.blueResults, this.state.redResults);
		var showResults = this.state.showResults;

		if (!blue || !red) {
			return "Loading...";
		}

		if (showResults) {
			if (!results) {
				return "Loading results...";
			}
			return (
				<div>
					<h1>Next match will start in 10 seconds!</h1>
					<div className="blue-results">
						<h1>{blue.name}</h1>
						<p>
							Wins<span>{blue.wins}</span>
						</p>
						<p>
							Defeats<span>{blue.defeats}</span>
						</p>
					</div>
					<div className="red-results">
						<h1>{red.name}</h1>
						<p>
							Wins<span>{red.wins}</span>
						</p>
						<p>
							Defeats<span>{red.defeats}</span>
						</p>
					</div>
				</div>
			);
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
				/>
				<Contestant
					hamsterData={red}
					grid="red-profile"
					imgSrc={`${red.imgName}`}
				/>
				<button
					onClick={this.submitVote.bind(this, "blue")}
					className="blue-vote"
				>
					<p>Vote</p>
				</button>
				<button
					onClick={this.submitVote.bind(this, "red")}
					className="red-vote"
				>
					<p>Vote</p>
				</button>
				{/* <Vote submitVote={this.submitVote("blue")} hamster="blue" />
        <Vote submitVote={this.submitVote("red")} hamster="red" /> */}
			</div>
		);
	}
}

export default Battle;
