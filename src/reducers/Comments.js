
import { GET_COMMENTS, RECEIVE_COMMENT } from '../actions/Comments'
import ArrayToDictionary from '../components/DomainServices/ArrayToDictionary'

export default function comments(state = {}, action) {

    switch (action.type) {
        case GET_COMMENTS:

            return {
                ...state,
                ...ArrayToDictionary(action.comments, 'id')
            }
        case RECEIVE_COMMENT:
        
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        default:
            return state
    }

}