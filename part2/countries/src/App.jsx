import { useState, useEffect } from "react";
import CountryData from "./components/CountryData";
import CountriesForm from "./components/CountriesForm";
import CountriesList from "./components/CountriesList";
import countryServices from "./services/country";

function App() {
    const [search, setSearch] = useState("");
    const [allCountries, setAllCountries] = useState([]);
    const [allCountriesNames, setAllCountriesNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);

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
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);

    return (
        <>
            <h1>Data for countries</h1>
            
            <CountriesForm search={search} handleSearch={handleSearch} />
            
            {search === "" && (
                <p>Please type the name of a country in the search</p>
            )}
            
            {filteredNames.length > 10 && (
                <p>Too many matches please specify your search</p>
            )}
            
            {filteredNames.length <= 10 && filteredNames.length > 1 && (
                <CountriesList names={filteredNames} countries={allCountries} />
            )}

            {filteredNames.length === 1 && (
                <CountryData name={filteredNames[0]} countries={allCountries} />
            )}
        </>
    );
}

export default App;
