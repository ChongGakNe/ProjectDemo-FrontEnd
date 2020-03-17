import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
            <ul>
              <li>
                <Link to="/"> About </Link>
              </li>
              <li>
                <Link to="/home"> To Do App Start! </Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" component={About} exact={true}/>
              <Route path="/home" component={Home} />
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;