import call from '../DataServices/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function getCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

export function handleGetAllCategories(nextAction) {
    return dispatch => {
        return call('categories')
            .then(x => {
                nextAction()
                dispatch(getCategories(x.categories))
            })
    }
}