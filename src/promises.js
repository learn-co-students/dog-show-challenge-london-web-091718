//return a promise with all the dogs
function getDogs() {
    return fetch('http://localhost:3000/dogs')
        .then(resp => resp.json());
}

//update dog 
const updateDog = dog =>
    fetch (`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    })

