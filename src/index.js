const dogURL = 'http://localhost:3000/dogs'
const dogForm = document.getElementById('dog-form')
const dogTable = document.getElementById('table-body')

const state = {
    dogs: [],
    dog: {}
}

// Render Dog
const renderDog = dog => {
    const dogEl = document.createElement('tr')
    dogEl.classList.add('dog-element')
    dogEl.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id='edit-btn' data-id=${dog.id}>Edit</button></td>
    `
    dogTable.appendChild(dogEl)
}

// Render Dogs
const renderDogs = dogs => {
    dogTable.innerHTML = '';
    dogs.forEach(dog => renderDog(dog))
}
    

// Fetch Dogs from API
getDogs(dogURL)
    .then(dogs => {
        state.dogs = [...dogs]
        renderDogs(dogs)
    })

// Edit Button
document.addEventListener('click', event => {
    if (event.target.id === 'edit-btn') {
        const btn = event.target
        state.dog = state.dogs[btn.dataset.id - 1]
        dogForm.name.value = state.dog.name
        dogForm.breed.value = state.dog.breed
        dogForm.sex.value = state.dog.sex
    }
})

// Submit Button
dogForm.addEventListener('submit', event => {
    event.preventDefault()
    state.dog.name = dogForm.name.value;
    state.dog.breed = dogForm.breed.value;
    state.dog.sex = dogForm.sex.value;
    patchDogs(dogURL, state.dog)
        .then(() => {
            dogForm.reset();
            getDogs(dogURL).then(dogs => {
                state.dogs = [...dogs]
                renderDogs(dogs)
            })
        })
})