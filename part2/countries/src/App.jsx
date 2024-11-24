import { useState, useEffect } from "react";

function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    useEffect(() => {
        if (search === "") {
            return;
        }
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
                    setCountries(filteredNames);
                    filteredNames.length === 1 &&
                        fetch(
                            `https://studies.cs.helsinki.fi/restcountries/api/name/${filteredNames[0]}`
                        )
                            .then((response) => response.json())
                            .then((data) => {
                                const nextCountry = { ...data };
                                setCountry(nextCountry);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 500);
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
                    autoFocus
                />
            </form>
            <h2>Country Data</h2>
            {countries.length === 0 && (
                <p>Please type the name of a country in the search</p>
            )}
            {countries.length > 10 && (
                <p>Too many matches please specify your search</p>
            )}
            {countries.length <= 10 && countries.length > 1 && (
                <ul>
                    {countries.map((country) => (
                        <li key={country}>{country}</li>
                    ))}
                </ul>
            )}
            {countries.length === 1 && Object.keys(country).length !== 0 && (
                <div>
                    <h3>{country.name.common}</h3>
                    <figure>
                        <img
                            src={country.flags.svg}
                            alt={country.flags.alt}
                            width={250}
                        />
                        <figcaption></figcaption>
                    </figure>
                    <p>Capital(s):</p>
                    <ul>
                        {country.capital.map((c) => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                    <p>Area: {`${country.area.toLocaleString()} km²`}</p>
                    <p>Population: {country.population.toLocaleString()}</p>
                    <p>
                        Currency name:{" "}
                        {Object.values(country.currencies)[0].name}
                    </p>
                    <p>
                        Currency symbol:{" "}
                        {Object.values(country.currencies)[0].symbol}
                    </p>
                    <p>Language(s):</p>
                    <ul>
                        {Object.values(country.languages).map((language) => (
                            <li key={language}>{language}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;
