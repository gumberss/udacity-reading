
const call = (path, method = "get", data) => fetch('http://localhost:3001/' + path,
    {
        method: method,
        headers: {
            'Authorization': 'whatever-you-want',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(x => x.json())

export default call