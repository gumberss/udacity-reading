import React, { Component } from 'react';
import { connect } from 'react-redux'

import { handleGetComments } from '../actions/Comments'

import CardPost from '../components/CardPost/CardPost'
import PostComment from '../components/PostComment/PostComment'
import CommentCreator from '../components/CommentCreator/CommentCreator'

class PostDetails extends Component {

    componentDidMount() {

        const { id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(handleGetComments(id))
    }

    render() {
        const { category, id } = this.props.match.params
        const { commentIds } = this.props

        return (
            <div className="container">
                <CardPost
                    postId={id}
                    styles={{ width: '100%' }}
                    canEdit
                    showBody
                />
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
            </div>);
    }
}

const mapStateToProps = ({ comments }, { match }) => {
    const postId = match.params.id

    return {
        commentIds: Object.keys(comments)
            .filter(commentId => comments[commentId].parentId === postId)
            .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
    };
}

export default connect(mapStateToProps)(PostDetails)