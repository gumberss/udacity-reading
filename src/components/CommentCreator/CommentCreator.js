import React, { Component } from 'react';
import newId from 'uuid/v1'
import { connect } from 'react-redux'

import './CommentCreator.css'

import TextInput from '../TextInput/TextInput'

import { handleNewComment } from '../../actions/Comments'
import { receivePost } from '../../actions/Posts'

class CommentCreator extends Component {

    state = {
        commentText: '',
        showError: false
    }

    onTextChange = e => {

        this.setState({
            commentText: e.target.value,
            showError: false
        })
    }

    onSubmitComment = e => {
        e.preventDefault()

        const { commentText } = this.state
        
        if(!commentText) {
            this.setState({
                showError: true
            })
            return;
        }

        const nextAction = () => this.setState({ commentText: '' })
        const { parent, dispatch } = this.props

        const comment = {
            id: newId(),
            timestamp: Date.now(),
            body: commentText,
            author: 'studant',
            parentId: parent.id,
        }

        dispatch(handleNewComment(comment, nextAction))

        parent.commentCount++

        dispatch(receivePost(parent))
    }

    render() {

        const { commentText, showError } = this.state

        return (
            <form className="column" onSubmit={this.onSubmitComment}>
                <div className="row new-comment__container">
                    <TextInput
                        multiline
                        rows={5}
                        title="Novo comentário:"
                        onChange={this.onTextChange}
                        value={commentText}
                    />
                </div>
                <div className="row comment-buttons__container">
                { showError && (<p className="error-message">É necessário preencher o campo para editar o comentário </p>) }

                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        Adicionar comentário
                    </button>
                </div>
            </form>);
    }
}

const mapStateToProps = ({ posts }, { postId }) => ({
    parent: posts[postId]
})

export default connect(mapStateToProps)(CommentCreator)