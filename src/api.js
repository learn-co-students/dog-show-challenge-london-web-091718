// get all the toys
const getDogs = () =>
    fetch(`http://localhost:3000/dogs`)
        .then(resp => resp.json())

// update a dog
const updateDog = dog =>
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())