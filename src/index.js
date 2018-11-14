    const tableBody = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form") // get dog form
    const dogName = document.querySelector(".name")
    const dogBreed = document.querySelector(".breed")
    const dogGender = document.querySelector(".sex")

// important to make the dogId global variable available
    state = {
        dogs: [],
        dog: {},
        dogId: 0
    }

// add event listner for when edit is clicked, populate the form field values
document.addEventListener("click", event => {
    if (event.target.className === "edit-btn" ) {
        const id = event.target.dataset.id
        console.log(id)
        const foundDog = state.dogs.find(dog => dog.id === parseInt(id))

        // we are making our foundDog, global so we can call to it later
        state.dog = foundDog
        // console.log(foundDog)
        state.dogId = foundDog.id
        dogName.value = foundDog.name,
        dogBreed.value = foundDog.breed
        dogGender.value = foundDog.sex      
    }
})
// form submit listner 
dogForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // creates a dog from our input values
    const dog = {
        id: state.dog.id,
        name: dogName.value,
        breed: dogBreed.value,
        sex: dogGender.value
    }

    console.log(dog)
    // update the dog, then render the local dog. And render it on the page
    updateDog(dog)
        .then(() => {
            state.dogs[dog.id - 1].name = dog.name
            state.dogs[dog.id - 1].breed = dog.breed
            state.dogs[dog.id - 1].sex = dog.sex
            // makes the whole table empty before we update
            tableBody.innerHTML = ""
            // render the dogs with the local dogs, once we know the data base has been updated
            renderDogs(state.dogs)
        })
         
    //makes values of the form zero after
    dogName.value = ""
    dogBreed.value = ""
    dogGender.value = ""

})

// render a dog, make sure you add an identifier data-id=, so we can find the dog later
const renderDog = (dog) => {
    const tableRow = document.createElement("tr")

    tableRow.innerHTML = `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id} class="edit-btn">Edit</button></td></tr>
    `
    tableBody.appendChild(tableRow)
}

// render all the dogs to the page
const renderDogs = (dogs) => 
    dogs.forEach(dog => renderDog(dog))

    getDogs()
        .then(dogs => {
            state.dogs = [...dogs]
            renderDogs(dogs)
        })
























