import React, { Component } from 'react';
import { connect } from 'react-redux'
import VoteScore from '../VoteScore/VoteScore'

import { TiEdit, TiDocumentDelete } from 'react-icons/ti'

import { handleCommentVote, handleEditComment, handleDeleteComment } from '../../actions/Comments'
import { receivePost } from '../../actions/Posts'

import TextInput from '../TextInput/TextInput'

import './PostComment.css'

class PostComment extends Component {

    state = {
        inEdit: false,
        newComment: '',
    }

    componentDidMount() {

        const { comment } = this.props

        this.setState({
            newComment: comment ? comment.body : ''
        })
    }

    onChangeToEdit = () => {
        this.setState(oldState => ({
            inEdit: !oldState.inEdit
        }))
    }

    onChangeComment = e => {
        this.setState({
            newComment: e.target.value,
            showError: false
        })
    }

    upVote = e => {
        const { comment, dispatch } = this.props

        dispatch(handleCommentVote(comment.id, true))
    }

    downVote = e => {
        const { comment, dispatch } = this.props

        dispatch(handleCommentVote(comment.id, false))
    }

    onDelete = e => {
        e.preventDefault()

        const { comment, parent, dispatch } = this.props

        const nextAction = () => {
            parent.commentCount--
            dispatch(receivePost(parent))
        }

        dispatch(handleDeleteComment(comment, nextAction))

    }

    onEdit = e => {
        e.preventDefault()
        const { dispatch, comment } = this.props
        const { newComment } = this.state

        dispatch(handleEditComment(comment.id, newComment))

        this.onChangeToEdit()
    }

    onCancelEdit = () => this.onChangeToEdit()

    renderEditComment = () => {
        const { id } = this.props
        const { newComment } = this.state

        return (
            <form onSubmit={this.onEdit}>
                <div className="row">
                    <TextInput
                        onChange={this.onChangeComment}
                        value={newComment}
                        inputId={id}
                        title="Qual é o comentário correto?"
                    />
                </div>
                <div className="row edit-comment-buttons__container">
                    <button
                        type="button"
                        className="btn btn-outline-primary edit-buttom"
                        onClick={this.onCancelEdit}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-outline-primary edit-buttom">
                        Editar
                    </button>
                </div>
            </form>
        )
    }

    render() {
        const { comment, styles } = this.props
        const { inEdit } = this.state

        return (
            <div className="card post-card" style={styles}>
                <div className="card-body">
                    <h5 className="card-text comment-author">By: {comment.author}</h5>
                    {!inEdit && (
                        <p className="card-text">{comment.body}</p>
                    )}

                    {inEdit && (this.renderEditComment())}

                </div>
                <div className="card-action__butons">

                    <VoteScore
                        upEvent={this.upVote}
                        downEvent={this.downVote}
                        score={comment.voteScore}
                    />

                    <div>
                        <TiEdit
                            size={22}
                            color="blue"
                            onClick={this.onChangeToEdit}
                        />

                        <TiDocumentDelete
                            size={22}
                            color="red"
                            onClick={this.onDelete}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ comments, posts }, { id }) => ({
    comment: comments[id],
    parent: posts[comments[id].parentId]
})

export default connect(mapStateToProps)(PostComment)