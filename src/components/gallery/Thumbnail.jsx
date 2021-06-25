import React, { Component } from "react";

class Thumbnail extends Component {
	render() {
		return (
			<img
				id={this.props.hamsterData.docId}
				src={this.props.hamsterData.imgName}
				onClick={() => {
					this.props.onClick(this.props.hamsterData);
				}}
				alt="avatar"
			/>
		);
	}
}
export default Thumbnail;
