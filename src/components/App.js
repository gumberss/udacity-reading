import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import MainPage from '../screen/mainPage/MainPage'
import NewPost from '../screen/NewPost'
import PostDetails from '../screen/PostDetails/PostDetails'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/new/:id?" component={NewPost}></Route>
          <Route exact path="/:category?" component={MainPage}></Route>
          <Route path="/:category/:id" component={PostDetails}></Route>
        </Switch>
      </Router>



    );
  }
}

export default App;
