const dogForm = document.querySelector('#dog-form')
const tableBody = document.querySelector('#table-body')

const retrieveDogs = () =>
    fetch('http://localhost:3000/dogs').then(resp=>resp.json())


const addDoggo = dogObject =>{
   const dogEl = document.createElement('tr')
    dogEl.innerHTML=`<td>${dogObject.name}</td>
    <td>${dogObject.breed}</td>
    <td>${dogObject.sex}</td>
    <td><button>Edit</button></td>`

    tableBody.appendChild(dogEl)
}

const shoveDogsToPage = dogs => dogs.forEach(dog => addDoggo(dog))

retrieveDogs().then(dogs => shoveDogsToPage(dogs))


