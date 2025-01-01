import Person from './Person' 

const Persons = ({ persons, onDeletePerson }) => {
  return (
      <ul>
          {persons.map((person, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Person name={person.name} number={person.number} />
                  <button style={{ marginLeft: '8px' }} onClick={() => onDeletePerson(person)}>Delete Me</button>
              </li>
          ))}
      </ul>
  );
};

export default Persons
