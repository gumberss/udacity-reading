import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'


import MainPage from '../screen/mainPage/MainPage'
import NewPost from '../screen/NewPost'
import PostDetails from '../screen/PostDetails'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}></Route>
          <Route exact path="/new" component={NewPost}></Route>
          <Route path="/:category/:id" component={PostDetails}></Route>
        </div>
      </Router>



    );
  }
}

export default App;
