import { GET_ALL_POSTS, RECEIVE_POST } from '../actions/Posts'

export default function posts(state = {}, action) {

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case RECEIVE_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        default:
            return state
    }
}