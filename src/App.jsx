import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'

import PersonsService from './Services/Persons'


const App = () => {
  const [persons, setPersons] = useState([{name: 'noName', number : 0}])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const useEffectHook = () => {
    PersonsService
    .getAll()
    .then(persons => setPersons(persons))
  }

  useEffect(useEffectHook, [])

  const filteredPersons = newFilter.length === 0 ? persons : persons.filter((p) => p.name.includes(newFilter))

  const deletePerson = (person) => {
    PersonsService
    .deletePerson(person.id)
    .then((deletedPerson) => {
      setPersons(persons.filter(p => p.id !== deletedPerson.id))
    })
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
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
      })
      .then(() => {
        alert(`${updatedPerson.name}'s number has been updated.`);
      })
      .catch(error => {
        setErrorMessage(`Infromation of ${updatedPerson.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      setErrorMessage(`${returnedPerson.name} was added successfuly`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    .catch(error => console.error('Error adding person:', error))
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
      <Notification message={errorMessage}/>
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <PersonForm onSubmit={addPerson} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson = {deletePerson}/>
    </div>
  )
}
export default App