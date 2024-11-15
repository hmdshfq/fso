import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "123-345-111" }]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextPersons = [...persons, { name: newName, number: newNumber }];
        setPersons(nextPersons);
        setNewName("");
        console.log(nextPersons);
        
    };

    const handleNameChange = (e) => {
        const nextName = e.target.value;
        const checkNewName = persons.filter(
            (person) => person.name === nextName
        );
        checkNewName.length === 1
            ? alert(`${nextName} is already added to phonebook`)
            : setNewName(nextName);
    };

    const handleNumberChange = e => {
        const nextNumber = e.target.value;
        setNewNumber(nextNumber);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Name: <input value={newName} onChange={handleNameChange} placeholder={newName} /></p>
                    <p>Number: <input value={newNumber} onChange={handleNumberChange} placeholder={newNumber} /></p>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return <p key={person.name}>{person.name} {person.number}</p>;
            })}
        </div>
    );
};

export default App;
