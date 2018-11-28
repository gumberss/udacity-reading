import React, { Component } from 'react';

import { connect } from 'react-redux'

class PostCard extends Component {
    render() {

        const { post } = this.props

        return (
            <div className="card container">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <button className="btn btn-primary">Go somewhere</button>
                </div>

            </div>);
    }
}

function mapStateToProps({ posts }, { id }){
    return {
        post: posts[id]
    }
}

export default connect(mapStateToProps)(PostCard)