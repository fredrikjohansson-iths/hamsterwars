import React from "react";
import "./Home.css";

function Home() {
	return (
		<div className="intro">
			<h1>Hamster Wars</h1>
			<h2>A Tournament of Cutsies</h2>
			<p>
				Hamster Wars is a chance for a selected few little critters to prove
				once and for all who's the CUTEST OF THEM ALL!
			</p>
			<p>
				But how's this decided you might ask? Well the thing is, you do! When
				you're ready, head over to the Battle page.
			</p>{" "}
			<p>
				There you will be presented with two hamsters, represented by the
				colours red and blue.
			</p>
			<p>
				{" "}
				After you've decided which of the two hamsters you think is the cutest,
				press the vote button representing your hamster of choice.
			</p>
			<p>
				The results will then be submitted to each hamsters records, and two
				more hamster will be ready for the next doubt!
			</p>
			<p>
				{" "}
				If you just want to look at some pictures of adorable hamsters, check
				out the Gallery!
			</p>
		</div>
	);
}

export default Home;
