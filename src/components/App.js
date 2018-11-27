import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import DynamicShow from './dynamic-show/DynamicShow';
import ContentCreator from './content-creator/ContentCreator'


class App extends Component {
  render() {
    return (
      <Router>
<div>
<Route exact path="/" component={ContentCreator}></Route>

<DynamicShow>
<div className="card" style={{ width: "18rem" }}>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button className="btn btn-primary">Go somewhere</button>
  </div>

</div>
</DynamicShow>
</div>
      </Router>



    );
  }
}

export default App;
