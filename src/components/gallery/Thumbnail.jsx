import React, { Component } from "react";

class Thumbnail extends Component {
  handleError(e) {
    e.target.src = "na.jpg";
  }
  render() {
    return (
      <img
        title={this.props.hamsterData.name}
        id={this.props.hamsterData.docId}
        src={this.props.hamsterData.imgName}
        className={`thumbnail `}
        onClick={() => {
          this.props.onClick(this.props.hamsterData, this.props.index);
        }}
        onError={this.handleError}
        alt={this.props.hamsterData.name}
      />
    );
  }
}
export default Thumbnail;
