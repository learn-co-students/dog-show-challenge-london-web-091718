const dogForm = document.querySelector('#dog-form')
const tableBody = document.querySelector('#table-body')
let currentDogId

const formName = dogForm.querySelector('#name')    
const formSex = dogForm.querySelector('#sex')        
const formBreed = dogForm.querySelector('#breed')

//fetch request
const retrieveDogs = () =>
    fetch('http://localhost:3000/dogs').then(resp=>resp.json())


//append a doggo
const addDoggo = dogObject =>{
   const dogEl = document.createElement('tr')
    dogEl.setAttribute('data-id', dogObject.id)
    dogEl.innerHTML=`<td>${dogObject.name}</td>
    <td>${dogObject.breed}</td>
    <td>${dogObject.sex}</td>
    <td><button class="edit-button">Edit</button></td>`
    const editButton = dogEl.querySelector('.edit-button')

    editButton.addEventListener('click', event => {
        currentDogId = dogObject.id
        formName.value = dogObject.name
        formSex.value = dogObject.sex
        formBreed.value = dogObject.breed     
    })

    tableBody.appendChild(dogEl)
}


//append all dogs to the index
const shoveDogsToPage = dogs => dogs.forEach(dog => addDoggo(dog))

//load/reload page
const loadPage = () => {
    tableBody.innerHTML=''
    retrieveDogs()
    .then(dogs => shoveDogsToPage(dogs))}


const editDogRequest = dog => {
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  })
}

loadPage()

       
    dogForm.addEventListener('submit', event => {
        event.preventDefault()

        updatedDogObject = {
            name: formName.value,
            id: currentDogId,
            breed: formBreed.value,
            sex: formSex.value
        }

        editDogRequest(updatedDogObject)
        formName.value = ''
        formSex.value = ''
        formBreed.value =''
        tableBody.innerHTML=''
        currentDogId=0
        loadPage()
    })