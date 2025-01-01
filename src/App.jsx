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
    .then(persons => setPersons(persons))
  }

  const addPerson = (event) => {
    event.preventDefault()

   if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
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