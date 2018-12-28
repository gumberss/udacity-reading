import React, { Component } from 'react';
import { connect } from 'react-redux'

import { handleGetComments } from '../../actions/Comments'

import './PostDetails.css'

import CardPost from '../../components/CardPost/CardPost'
import PostComment from '../../components/PostComment/PostComment'
import CommentCreator from '../../components/CommentCreator/CommentCreator'
import NotFound from '../NotFound/NotFound'

class PostDetails extends Component {

    componentDidMount() {

        const { id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(handleGetComments(id))
    }

    goBack = () => {
        const { history } = this.props

        history.goBack()
    }

    render() {
        const { id } = this.props.match.params
        const { commentIds, existPost } = this.props

        return (
            <div>
                {existPost && (
                    <div className="container">
                        <CardPost
                            postId={id}
                            styles={{ width: '100%' }}
                            onDelete={this.goBack}
                            canEdit
                            showBody
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-primary details-go-back__button"
                            onClick={this.goBack}
                        >
                            Voltar
                        </button>
                        <hr />
                        <CommentCreator
                            postId={id}
                        />
                        <hr />
                        {commentIds.map(id => <PostComment
                            key={id}
                            id={id}
                            styles={{ width: '100%' }}
                        />)}
                    </div>)
                }
                {!existPost && (<NotFound />)}
            </div>

        )
    }
}

const mapStateToProps = ({ comments, posts }, { match }) => {
    const postId = match.params.id

    return {
        commentIds: Object.keys(comments)
            .filter(commentId => comments[commentId].parentId === postId && !comments[commentId].deleted)
            .sort((a, b) => comments[b].timestamp - comments[a].timestamp),
        existPost: !!posts[postId]
    };
}

export default connect(mapStateToProps)(PostDetails)