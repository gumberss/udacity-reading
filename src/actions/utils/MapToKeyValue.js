export default (array, key) => {
    return [...array].reduce((current, next) => {

        return { ...current, [next[key]]: { ...next } }
    }, {})
}