import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/global/Header'
import Home from './routes/Home'
import Battle from './routes/Battle'
import Gallery from './routes/Gallery'
import History from './routes/History'
import Statistics from './routes/Statistics'
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <Header/>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/battle">
            <Battle />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  
}
