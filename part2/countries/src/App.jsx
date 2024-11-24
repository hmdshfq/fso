import { useState, useEffect } from "react";

function App() {
    // https://studies.cs.helsinki.fi/restcountries/
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    useEffect(() => {
        
    }, []);

    return (
        <>
            <h1>Data for countries</h1>
            <form>
                <label htmlFor="search">Find countries: </label>
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={handleSearch}
                />
            </form>
        </>
    );
}

export default App;
