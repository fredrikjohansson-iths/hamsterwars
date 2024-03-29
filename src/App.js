import React from "react";
// eslint-disable-next-line 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/global/Header'
import Home from './routes/Home'
import Battle from './routes/Battle'
import Gallery from './routes/Gallery'

export default function App() {
  return (
    <Router>
      <Header/>
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
    </Router>
  );
  
}
