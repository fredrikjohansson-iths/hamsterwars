import React, { Component } from 'react';

const NameSign = ({ name }) => {
  return <h1>{name}</h1>;
 };

class Versus extends Component {
    render() {
        return <div className="Versus"><NameSign id="Left" name="Test" /></div>
    }
  }
;
export default Versus;