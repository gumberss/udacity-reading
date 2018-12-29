import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import MainPage from '../screen/mainPage/MainPage'
import NewPost from '../screen/NewPost'
import PostDetails from '../screen/PostDetails/PostDetails'

import { handleGetAllCategories } from '../actions/Categories'

class App extends Component {

  state = {
    loadedCategories: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    const setLoadedState = propName => () =>
      this.setState({
        [propName]: true
      })

    const onLoadedCategories = setLoadedState('loadedCategories')

    dispatch(handleGetAllCategories(onLoadedCategories))
  }

  render() {

    const { loadedCategories } = this.state

    return loadedCategories && (
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

export default connect()(App);