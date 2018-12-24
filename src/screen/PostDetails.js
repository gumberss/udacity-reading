import React, { Component } from 'react';

import CardPost from '../components/CardPost/CardPost'

export default class PostDetails extends Component {
    render() {
        const { category, id } = this.props.match.params

        console.log(id)
        return (
            <div className="container">
                <CardPost 
                    postId={id}
                    styles={{ width: '100%' }}
                    canEdit
                    showBody
                />
            </div>);
    }
}
