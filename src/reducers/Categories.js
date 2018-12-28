
import { RECEIVE_CATEGORIES } from '../actions/Categories'
import ArrayToDictionary from '../components/DomainServices/ArrayToDictionary'

export default function categories(state = {}, action) {
    
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            var defaultCategory = { default: { name: 'todos', path: '/' } };

            return {
                ...state,
                ...defaultCategory,
                ...ArrayToDictionary(action.categories, 'name')
            }
        default:
            return state
    }

}