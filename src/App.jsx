import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import PersonsService from './Services/Persons'

const App = () => {
  const [persons, setPersons] = useState([{name: 'noName', number : 0}])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

const getAll = () => {
  PersonsService
  .getAll()
  .then(persons => setPersons(persons))
}

  const useEffectHook = () => {
    getAll()
  }

  useEffect(useEffectHook, [])

  const filteredPersons = newFilter.length === 0 ? persons : persons.filter((p) => p.name.includes(newFilter))

  const deletePerson = (person) => {
    PersonsService
    .deletePerson(person.id)
    .then(() =>getAll())
    .catch(error => console.error('Error deleting person:', error))
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((p) => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(`Are you sure you want to update ${existingPerson.name}?`)
      if (confirmUpdate === false) {
        return
      }

      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      PersonsService
      .update(updatedPerson.id, updatedPerson)
      .then(() => getAll())
      .then(() => {
        alert(`${updatedPerson.name}'s number has been updated.`);
      })
      return
    }
    const newPerson = {
      id: uuidv4(),
      name: newName,
      number: newNumber
    }

    PersonsService
    .create(newPerson)  
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <PersonForm onSubmit={addPerson} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson = {deletePerson}/>
    </div>
  )
}
export default App