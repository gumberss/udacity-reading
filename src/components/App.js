import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import DynamicShow from './dynamic-show/DynamicShow';
import MainPage from '../screen/mainPage/MainPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}></Route>
        </div>
      </Router>



    );
  }
}

export default App;
