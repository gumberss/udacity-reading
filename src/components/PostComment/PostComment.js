import React, { Component } from 'react';
import { connect } from 'react-redux'
import VoteScore from '../VoteScore/VoteScore'

import { handleCommentVote } from '../../actions/Comments'

class PostComment extends Component {


    upVote = e => {
        const { comment, dispatch } = this.props

        dispatch(handleCommentVote(comment.id, true))
    }

    downVote = e => {
        const { comment, dispatch } = this.props

        dispatch(handleCommentVote(comment.id, false))
    }

    render() {
        const { comment, styles } = this.props

        return (
            <div className="card post-card" style={styles}>
                <div className="card-body">
                    <h5 className="card-text">By: {comment.author}</h5>
                    <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-action__butons">

                    <VoteScore
                        upEvent={this.upVote}
                        downEvent={this.downVote}
                        score={comment.voteScore}
                    />

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ comments }, { id }) => ({
    comment: comments[id]
})

export default connect(mapStateToProps)(PostComment)