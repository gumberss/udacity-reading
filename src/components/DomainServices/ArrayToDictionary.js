export default (array, key = "id") => {
    
    return array.reduce((reduced, current) => {
        return {
            ...reduced,
            [current[key]]: {
                ...current
            }
        }
    }, {})
}