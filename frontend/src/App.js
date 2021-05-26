import Home from './routes/Home'
import Battle from './routes/Battle'
import Gallery from './routes/Gallery'
import History from './routes/History'
import Statistics from './routes/Statistics'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/battle">Battle</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>

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
          <Route path="/Statistics">
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