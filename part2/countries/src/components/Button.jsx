import { useState } from 'react';

const Button = ({country, setSearch}) => {
    const [isCountryShown, setIsCountryShown] = useState(false);

    const handleVisibility = () => {
        setIsCountryShown(!isCountryShown);
        isCountryShown && setSearch(country)
    }
    return (
        <button onClick={handleVisibility}>{isCountryShown ? 'Hide': 'Show'}</button>
    )
};

export default Button;