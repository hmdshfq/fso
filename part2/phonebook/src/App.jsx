import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        const nextSearch = e.target.value;
        setSearch(nextSearch);
        const nextSearchResult = persons.filter((person) =>
            person.name.toLowerCase().includes(nextSearch)
        );
        setSearchResult(nextSearchResult);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextPersons = [...persons, { name: newName, number: newNumber }];
        setPersons(nextPersons);
        setNewName("");
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

    const handleNumberChange = (e) => {
        const nextNumber = e.target.value;
        setNewNumber(nextNumber);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" value={search} onChange={handleSearch} />
            {searchResult.map((result) => (
                <p key={result.id}>
                    {result.name} {result.number}
                </p>
            ))}
            <h2>Add a contact</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>
                        <label htmlFor="name">Name: </label>
                        <input
                            id="name"
                            value={newName}
                            onChange={handleNameChange}
                            placeholder={newName}
                        />
                    </p>
                    <p>
                        <label htmlFor="number">Number: </label>
                        <input
                            id="number"
                            value={newNumber}
                            onChange={handleNumberChange}
                            placeholder={newNumber}
                        />
                    </p>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Contacts</h2>
            {persons.map((person) => {
                return (
                    <p key={person.name}>
                        {person.name} {person.number}
                    </p>
                );
            })}
        </div>
    );
};

export default App;
