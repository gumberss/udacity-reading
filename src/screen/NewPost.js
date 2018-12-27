import React, { Component } from 'react';

import ContentCreator from '../components/ContentCreator/ContentCreator'

export default class NewPost extends Component {

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    
    return (
        <ContentCreator 
          postId={this.props.match.params.id}
          goBack={this.goBack}
        />
    );
  }
}
