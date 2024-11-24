const CountryData = ({country}) => {
    return (
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
            <p>Currency name: {Object.values(country.currencies)[0].name}</p>
            <p>
                Currency symbol: {Object.values(country.currencies)[0].symbol}
            </p>
            <p>Language(s):</p>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
        </div>
    );
};

export default CountryData;
