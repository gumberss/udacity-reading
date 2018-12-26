import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiMessages, TiInfoLargeOutline, TiEdit } from 'react-icons/ti'
import VoteScore from '../VoteScore/VoteScore'

import './CardPost.css'

import { handleVotePost } from '../../actions/Posts'

class CardPost extends Component {


    upVote = e => {

        const { dispatch, post } = this.props

        dispatch(handleVotePost(post.id, true))
    }

    downVote = e => {

        const { dispatch, post } = this.props

        dispatch(handleVotePost(post.id, false))
    }

    onDetails = e => {

    }

    onEdit = e => {

    }

    getDetailsUrl = () => {

        const { post } = this.props

        return `${post.category}/${post.id}`
    }

    render() {
        const { post, canEdit, showBody, styles, showDetails } = this.props

        return (
            <div className="card post-card" style={styles}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    {showBody && (<p className="card-text">{post.body}</p>)}
                    <p className="card-text">By: {post.author}</p>
                </div>
                <div className="card-action__butons">

                    <div className="buttons__container">

                        <div className="details-content">

                            <span style={{ color: 'blue' }}>
                                {post.commentCount}
                            </span>
                            <TiMessages
                                size={22}
                                color="blue"
                                onClick={this.onDetails}
                            />
                        </div>

                          <VoteScore
                        upEvent={this.upVote}
                        downEvent={this.downVote}
                        score={post.voteScore}
                    />
                    </div>

                    <div>

                        {showDetails && (<Link
                            to={this.getDetailsUrl()}
                        >
                            <TiInfoLargeOutline
                                size={22}
                                color="blue"
                                onClick={this.onDetails}
                            />
                        </Link>)}

                        {canEdit && (<TiEdit
                            size={22}
                            color="blue"
                            onClick={this.onEdit}
                        />)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, { postId }) => ({
    post: posts[postId]
});

export default connect(mapStateToProps)(CardPost)