import React, { Component } from 'react';
import './Versus.css'
const NameSign = ({className, name }) => {
  return <h1 className={className}>{name}</h1>;
 };

class Versus extends Component {
    render() {
        return <div className="Versus"><NameSign className="Left" name="Test" /><NameSign className="Right" name="Test 2" /></div>
    }
  }
;
export default Versus;