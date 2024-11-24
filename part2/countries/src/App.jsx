import { useState, useEffect } from "react";
import Button from "./components/Button";
import CountryData from "./components/CountryData";
import CountriesForm from "./components/CountriesForm";
import countryServices from "./services/country";

function App() {
    const [search, setSearch] = useState("");
    const [allCountries, setAllCountries] = useState([]);
    const [allCountriesNames, setAllCountriesNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [country, setCountry] = useState({});
    const [countryIndex, setCountryIndex] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    useEffect(() => {
        countryServices.getAll().then((initialCountries) => {
            const nextAllCountries = [...initialCountries];
            setAllCountries(nextAllCountries);
            const nextAllCountriesNames = nextAllCountries.map(
                (country) => country.name.common
            );
            setAllCountriesNames(nextAllCountriesNames);
        });
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredNames([]);
            return;
        }
        const timeoutId = setTimeout(() => {
            const nextFilteredNames = allCountriesNames.filter((country) =>
                country.toLowerCase().includes(search)
            );
            setFilteredNames(nextFilteredNames);
            if (nextFilteredNames.length === 1) {
                countryServices
                    .getCountry(nextFilteredNames[0])
                    .then((country) => {
                        const nextCountry = { ...country };
                        setCountry(nextCountry);
                    });
            }
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [search, allCountriesNames, country]);

    return (
        <>
            <h1>Data for countries</h1>
            <CountriesForm search={search} handleSearch={handleSearch} />
            <h2>Country Data</h2>
            {search === "" && (
                <p>Please type the name of a country in the search</p>
            )}
            {filteredNames.length > 10 && (
                <p>Too many matches please specify your search</p>
            )}
            {filteredNames.length <= 10 && filteredNames.length > 1 && (
                <ul>
                    {filteredNames.map((name) => (
                        <li key={name}>
                            {name} <Button name={name} />
                        </li>
                    ))}
                </ul>
            )}
            {filteredNames.length === 1 &&
                Object.keys(country).length !== 0 && (
                    <CountryData country={country} />
                )}
        </>
    );
}

export default App;
