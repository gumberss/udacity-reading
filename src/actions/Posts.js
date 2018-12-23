import call from '../DataServices/api'
import mapArrayToDictionary from '../components/DomainServices/ArrayToDictionary'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_NEW_POST = 'ADD_NEW_POST'

function getAllPosts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

function receivePost(post) {
    return {
        type: RECEIVE_POST,
        post
    }
}

export function handleGetAllPosts() {
    return dispatch => call('posts').then(posts => dispatch(getAllPosts(mapArrayToDictionary(posts))))
}

export function handleVotePost(id, isPositive) {
    return dispatch => call(`posts/${id}`, 'post', {
        option: isPositive ? 'upVote' : 'downVote'
    })
    .then(post => dispatch(receivePost(post)))
}

export function handleNewPost(post) {
    return {
        ADD_NEW_POST
    }
}