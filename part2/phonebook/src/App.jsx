import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Notification from "./Notification";
import contactsService from "./services/contacts";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [message, setMessage] = useState(null);

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
            number: newNumber,
        };

        const existingContact = persons.find(
            (person) => person.name === newPerson.name
        );

        if (existingContact !== undefined) {
            const confirmation = window.confirm(
                `${newPerson.name} is already added to phone-book, replace the old number with a new one?`
            );
            if (confirmation) {
                contactsService
                    .update(existingContact.id, newPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== returnedPerson.id
                                    ? person
                                    : returnedPerson
                            )
                        );
                        setMessage(`Updated ${returnedPerson.name}`)
                        setTimeout(()=>{
                            setMessage(null)
                        }, 5000)
                    });
            }
        } else {
            contactsService.create(newPerson).then((returnedPerson) => {
                setPersons([...persons, returnedPerson]);
                setMessage(`Added ${returnedPerson.name}`)
                setTimeout(()=>{
                    setMessage(null)
                }, 5000)
            });
        }

        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (e) => {
        const nextName = e.target.value;
        setNewName(nextName);
    };

    const handleNumberChange = (e) => {
        const nextNumber = e.target.value;
        setNewNumber(nextNumber);
    };

    useEffect(() => {
        contactsService.getAll().then((initialContacts) => {
            setPersons(initialContacts);
        });
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
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
            <Contacts persons={persons} setPersons={setPersons} setMessage={setMessage}/>
        </div>
    );
};

export default App;
