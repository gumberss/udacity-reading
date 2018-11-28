import call from '../data-services/api'
import MapToKeyValue from './utils/MapToKeyValue'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'


function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function handleReceivePosts() {
    return dispatch =>
        call('posts')
            .then(posts => MapToKeyValue(posts, 'id'))
            .then(postsArray => dispatch(receivePosts(postsArray)))
}