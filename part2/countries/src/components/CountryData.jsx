import { useEffect, useState } from "react";
import weatherService from "../services/country";

const CountryData = ({ name, countries }) => {
    const country = countries.find((country) => country.name.common === name);
    const [latitude, longitude] = country.capitalInfo.latlng;
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        weatherService.getWeather(latitude, longitude).then((data) => {
            setWeatherData(data);
        });
    }, []);

    return (
        <div>
            <h2>{country.name.common}</h2>
            <figure>
                <img
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    width={200}
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
            <h3>Weather in {country.capital[0]}</h3>
            {weatherData.length !== 0 && (
                <>
                    <figure style={{margin: 0}}>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                        />
                        <figcaption>{weatherData.weather[0].description}</figcaption>
                    </figure>
                    <p>Feels like: {Math.floor(weatherData.main.feels_like)}°C</p>
                    <p>Temperature: {Math.floor(weatherData.main.temp)}°C</p>
                </>
            )}
        </div>
    );
};

export default CountryData;
