import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TiDocumentDelete, TiMessages, TiInfoLargeOutline, TiEdit } from 'react-icons/ti'
import VoteScore from '../VoteScore/VoteScore'

import './CardPost.css'

import { handleVotePost, handleDeletePost } from '../../actions/Posts'

class CardPost extends Component {


    upVote = e => {

        const { dispatch, post } = this.props

        dispatch(handleVotePost(post.id, true))
    }

    downVote = e => {

        const { dispatch, post } = this.props

        dispatch(handleVotePost(post.id, false))
    }

    onDelete = e => {
        e.preventDefault()

        const { dispatch, post, onDelete } = this.props

        dispatch(handleDeletePost(post))

        onDelete && onDelete(post)
    }

    getDetailsUrl = () => {

        const { post } = this.props

        return `${post.category}/${post.id}`
    }

    getEditUrl = () => {
        const { post } = this.props

        return `/new/${post.id}`
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
                            />
                        </Link>)}

                        {canEdit && (<Link
                            to={this.getEditUrl()}
                        >
                            <TiEdit
                                size={22}
                                color="blue"
                            />
                        </Link>
                        )}
                        <TiDocumentDelete
                            size={22}
                            color="red"
                            onClick={this.onDelete}
                        />
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = ({ posts }, { postId }) => ({
    post: posts[postId]
});

export default connect(mapStateToProps)(CardPost)