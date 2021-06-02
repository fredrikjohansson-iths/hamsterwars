import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/global/Header'
import Home from './routes/Home'
import Battle from './routes/Battle'
import Gallery from './routes/Gallery'
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <Header/>
      <div>
        <Switch>
          <Route path="/battle">
            <Battle />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  
}
