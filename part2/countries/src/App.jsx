import { useState, useEffect } from "react";
import Button from "./components/Button";
import CountryData from './components/CountryData';
import CountriesForm from "./components/CountriesForm";

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
            setCountries([]);
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
            <CountriesForm search={search} handleSearch={handleSearch} />
            <h2>Country Data</h2>
            {search === "" && (
                <p>Please type the name of a country in the search</p>
            )}
            {countries.length > 10 && (
                <p>Too many matches please specify your search</p>
            )}
            {countries.length <= 10 && countries.length > 1 && (
                <ul>
                    {countries.map((country) => (
                        <li key={country}>
                            {country}{" "}
                            <Button country={country} setSearch={setSearch} />
                        </li>
                    ))}
                </ul>
            )}
            {countries.length === 1 && Object.keys(country).length !== 0 && (
                <CountryData country={country} />
            )}
        </>
    );
}

export default App;
