import React, { Component } from "react";

class Thumbnail extends Component {
    render() {

        return (
            <div>
                <img
                    src={this.props.hamsterData.imgName}
                   
                    alt="avatar"
                />
            </div>
        );
    }
}
export default Thumbnail;
