import React, { Component } from 'react';

import ContentCreator from '../../components/ContentCreator/ContentCreator'
import ListPosts from '../../components/ListPosts/ListPosts'

export default class MainPage extends Component {
  render() {
    return (
      <div className="container">
        <ListPosts />
      </div>
    );
  }
}
