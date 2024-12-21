import Person from './Person' 

const Persons = ({persons}) => {
    return (
        <ul>
        {persons.map((person, index) => 
          <Person name={person.name} number={person.number} key={index}/>
        )}
      </ul>
    )
}

export default Persons
