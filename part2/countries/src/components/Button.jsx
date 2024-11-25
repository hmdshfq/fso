const Button = ({isShown, setIsShown, index}) => {
    const handleVisibility = () => {
        const nextArray = [...isShown];
        nextArray[index] = !isShown[index];
        setIsShown(nextArray);
    }
    return (
        <button onClick={handleVisibility}>{isShown[index] ? 'Hide': 'Show'}</button>
    )
};

export default Button;