let tableBody = document.querySelector('#table-body')
let tableName = document.querySelector('input[name="name"]')
let tableBreed = document.querySelector('input[name="breed"]')
let tableSex = document.querySelector('input[name="sex"]')
let form = document.querySelector('#dog-form')
const submit = form.querySelector('input[name="submit"]')

let dogid


document.addEventListener('DOMContentLoaded', () => {

})

getDogs()
    .then(dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
        })
    })

function renderDog(dog) {
    tableEl = document.createElement('tr')
    tableEl.innerHTML = `<td id = "name-${dog.id}">${dog.name}</td> 
    <td id = "breed-${dog.id}">${dog.breed}</td> 
    <td id = "sex-${dog.id}">${dog.sex}</td> 
    <td><button id = "edit-button-${dog.id}">Edit</button></td>`

    tableBody.appendChild(tableEl)

    let dogName = tableEl.querySelector(`#name-${dog.id}`)
    let dogBreed = tableEl.querySelector(`#breed-${dog.id}`)
    let dogSex = tableEl.querySelector(`#sex-${dog.id}`)

    //click edit button, populate form with dog info

    tableEl.addEventListener('click', event => {
        if (event.target.id === `edit-button-${dog.id}`) {
            event.preventDefault
            let nameToEdit = tableName.value = dogName.innerText
            let breedToEdit = tableBreed.value = dogBreed.innerText
            let sexToEdit = tableSex.value = dogSex.innerText
            console.log(dogid)
            dogid = dog.id
        }
    })
}


//submit form


form.addEventListener( 'submit', event => {
    event.preventDefault()

    const editedDog = {
        name: tableName.value,
        breed: tableBreed.value,
        sex: tableSex.value,
        id: dogid
    }

    updateDog(editedDog)
        .then(() => {
             // clear dogs
            tableBody.innerHTML = ""
           //render previous show function i.e. first promise
            getDogs()
                .then(dogs => {
                    dogs.forEach(dog => {
                        renderDog(dog)
                    })
                })
        })
   
})

























// function createTd(content) {
//     const td = document.createElement('td')
//     td.innerHTML = content
//     return td
// }

// function renderDog(dog) {
//     tableEl = document.createElement('tr');
//     [
//         dog.name,
//         dog.breed,
//         dog.sex
//     ].forEach(attributeOfDog => {
//         tableEl.appendChild(createTd(attributeOfDog))
//     })
    
//     const editTd = document.create td
//     const button create button
//     button.addEventListener
//     editTd.appendChild(button)
//     tableEl.appendChild(editTd)

//     tableBody.appendChild(tableEl)
