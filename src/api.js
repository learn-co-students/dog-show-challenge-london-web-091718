const getDogs = url =>
    fetch(url)
        .then(resp => resp.json())

const patchDogs = (url, dog) => {
    return fetch(`${url}/${dog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    })
        .then(resp => resp.json())
}