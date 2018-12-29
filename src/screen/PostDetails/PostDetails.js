import React, { Component } from 'react';
import { connect } from 'react-redux'

import { handleGetComments } from '../../actions/Comments'
import { handleGetPost } from '../../actions/Posts'
import { Link } from 'react-router-dom'
import './PostDetails.css'

import CardPost from '../../components/CardPost/CardPost'
import PostComment from '../../components/PostComment/PostComment'
import CommentCreator from '../../components/CommentCreator/CommentCreator'
import NotFound from '../NotFound/NotFound'

class PostDetails extends Component {

    state = {
        searchInServer: false
    }

    componentDidMount() {

        const { id } = this.props.match.params
        const { dispatch, findedPost } = this.props

        const nextAction = () => this.setState({
                searchInServer: true
            })

        !findedPost && dispatch(handleGetPost(id, nextAction))

        dispatch(handleGetComments(id))
    }

    goBack = () => {
        
        const { history } = this.props

        history.goBack()
    }

    render() {
        const { id } = this.props.match.params
        const { commentIds, findedPost } = this.props
        const { searchInServer } = this.state

        return (
            <div>
                {findedPost && (
                    <div className="container">
                        <CardPost
                            postId={id}
                            styles={{ width: '100%' }}
                            onDelete={this.goBack}
                            canEdit
                            showBody
                        />
                          <Link
                            className="btn btn-outline-primary details-go-back__button"
                            to="/"
                        >
                            Voltar
                        </Link>
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
                {!findedPost && searchInServer && (<NotFound />)}
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
        findedPost: !!posts[postId]
    };
}

export default connect(mapStateToProps)(PostDetails)