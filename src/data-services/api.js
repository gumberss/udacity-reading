
const call = path => fetch('http://localhost:3001/' + path, { headers: { 'Authorization': 'whatever-you-want' } })
    .then(x => x.json())


export default call