import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("Enter name");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextPersons = [...persons, { name: newName }];
        setPersons(nextPersons);
        setNewName("");
    };

    const handleChange = (e) => {
        const nextNewName = e.target.value;
        const checkNewName = persons.filter(
            (person) => person.name === nextNewName
        );
        checkNewName.length === 1
            ? alert(`${nextNewName} is already added to phonebook`)
            : setNewName(nextNewName);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return <p key={person.name}>{person.name}</p>;
            })}
        </div>
    );
};

export default App;
