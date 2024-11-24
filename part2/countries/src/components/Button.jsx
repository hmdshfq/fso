import { useState } from 'react';

const Button = () => {
    const [isCountryShown, setIsCountryShown] = useState(false);

    const handleVisibility = () => {
        setIsCountryShown(!isCountryShown);
    }
    return (
        <button onClick={handleVisibility}>{isCountryShown ? 'Hide': 'Show'}</button>
    )
};

export default Button;