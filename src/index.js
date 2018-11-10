

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const nameInput = document.querySelector('input[type="name"]')
  const breedInput = document.querySelector('input[type="breed"]')
  const sexInput = document.querySelector('input[type="sex"]')


  const state = {
    dogs: []
  }

  const renderDog = dog => {
    const tableRowItem = document.createElement('tr')
    tableRowItem.classList.add('table-row')
    tableRowItem.dataset.dogId = dog.id
    tableRowItem.innerHTML =
    `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="edit-btn" data-dog-id ="${dog.id}">Edit Dog</button></td>
    <td><button class="remove-btn" data-dog-id ="${dog.id}">Delete Dog</button></td>
    `
    tableBody.appendChild(tableRowItem)
  }

  const renderDogs = dogs => {
    dogs.forEach(dog => renderDog(dog))
  }

  const findDog = id =>
    state.dogs.find(dog => dog.id === parseInt(id))


  getDogs()
    .then(dogs => {
      state.dogs = [...dogs]
      renderDogs(state.dogs)
    })


  document.addEventListener('click', event => {
    if(event.target.className === 'edit-btn') {
      const id = event.target.dataset.dogId
      const foundDog = findDog(id)

    const dogInfo = {
      name: foundDog.name,
      breed: foundDog.breed,
      sex: foundDog.sex
    }

    // dogForm.setAttribute('data-dog-id', `${id}`)
    nameInput.setAttribute('value', `${dogInfo.name}`)
    breedInput.setAttribute('value', `${dogInfo.breed}`)
    sexInput.setAttribute('value', `${dogInfo.sex}`)
    nameInput.setAttribute('data-dog-id', `${id}`)
    }

    if(event.target.className === 'remove-btn') {
      const deleteDogId = event.target.dataset.dogId
      const foundDogToDelete = findDog(deleteDogId)
      const tableRowItem = document.querySelector(`tr[data-dog-id='${deleteDogId}']`)
      if(confirm(`Are you sure you want to delete ${foundDogToDelete.name}?`)) {
        tableRowItem.remove()
        deleteDog(foundDogToDelete)
      } else {
        return ''
      }
    }
  })


  dogForm.addEventListener('submit', event => {
    event.preventDefault();

    const id = nameInput.dataset.dogId
    const foundDog = findDog(id)

    const updateDogInfo = {
      id: foundDog.id,
      name: nameInput.value,
      breed: breedInput.value,
      sex: sexInput.value
    }

    updateDog(updateDogInfo);

    nameInput.setAttribute('value', `${updateDogInfo.name}`)
    breedInput.setAttribute('value', `${updateDogInfo.breed}`)
    sexInput.setAttribute('value', `${updateDogInfo.sex}`)

    dogForm.reset();

    getDogs()
      .then(dogs => {
        state.dogs = [...dogs];
        tableBody.innerHTML = '';
        renderDogs(state.dogs);
      })

  })

})
