import { useState } from 'react';
import Button from './Button';
import CountryData from './CountryData';

const CountriesList = ({names, countries}) => {
    const [isShown, setIsShown] = useState([]);
    return (
        <ul>
            {names.map((name, index) => (
                <li key={name}>
                    {name} <Button isShown={isShown} setIsShown={setIsShown} index={index} />
                    {isShown[index] && <CountryData name={name} countries={countries} />}
                </li>
            ))}
        </ul>
    );
};

export default CountriesList;
