import call from '../DataServices/api'

export const GET_COMMENTS = 'GET_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

function getComments(comments) {
    return {
        type: GET_COMMENTS,
        comments
    }
}

function receiveComment(comment) {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

export function handleGetComments(postId) {
    return dispatch => {
        return call(`posts/${postId}/comments`)
            .then(comments => dispatch(getComments(comments)))
    }
}

export function handleCommentVote(id, isPositive) {
    return dispatch => call(`comments/${id}`, 'post', {
        option: isPositive ? 'upVote' : 'downVote'
    })
    .then(comment => dispatch(receiveComment(comment)))
}

export function handleNewComment(comment, onCreateAction){
    return dispatch => {
        call('comments', 'post', comment)
        .then(addedComment => {
            onCreateAction && onCreateAction();
            return dispatch(receiveComment(addedComment))
        })
    }
}