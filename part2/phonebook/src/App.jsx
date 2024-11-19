import { useEffect, useState } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        const nextSearch = e.target.value;
        setSearch(nextSearch);
        const nextSearchResult =
            nextSearch === ""
                ? []
                : persons.filter((person) =>
                    person.name.toLowerCase().includes(nextSearch)
                );
        setSearchResult(nextSearchResult);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextPersons = [
            ...persons,
            { name: newName, number: newNumber, id: persons.length + 1 },
        ];
        setPersons(nextPersons);
        setNewName("");
        setNewNumber("");
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

    useEffect(()=>{
        axios
            .get("http://localhost:3001/persons")
            .then(response => setPersons(response.data));
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                search={search}
                searchResult={searchResult}
                handleSearch={handleSearch}
            />
            <h2>Add a contact</h2>
            <ContactForm
                newName={newName}
                newNumber={newNumber}
                handleSubmit={handleSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Contacts</h2>
            <Contacts persons={persons} />
        </div>
    );
};

export default App;
