import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import contactsService from './services/contacts';

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
        const newPerson = { 
            name: newName, 
            number: newNumber
        }
        contactsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons([...persons, returnedPerson]);
            })
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
        contactsService
            .getAll()
            .then(initialContacts => setPersons(initialContacts));
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
            <Contacts persons={persons} setPersons={setPersons} />
        </div>
    );
};

export default App;
