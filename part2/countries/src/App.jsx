import { useState, useEffect } from "react";

function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetch("https://studies.cs.helsinki.fi/restcountries/api/all/")
                .then((response) => response.json())
                .then((data) => {
                    const allCountries = data;
                    const allCountriesNames = allCountries.map(
                        (country) => country.name.common
                    );
                    const filteredNames = allCountriesNames.filter((country) =>
                        country.toLowerCase().includes(search)
                    );
                    console.log(filteredNames);
                    console.log(search);
                    setCountries(filteredNames);
                });
        }, 1000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);

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
            <h2>Country Data</h2>
            <p>{countries}</p>
        </>
    );
}

export default App;
