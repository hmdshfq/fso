import React from "react";

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Display = ({good, neutral, bad}) => {
    return (
        <>
            <h2>Statistics</h2>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
        </>
    );
};

const App = () => {
    const [good, setGood] = React.useState(0);
    const [neutral, setNeutral] = React.useState(0);
    const [bad, setBad] = React.useState(0);

    const increaseGood = () => setGood(good + 1);
    const increaseNeutral = () => setNeutral(neutral + 1);
    const increaseBad = () => setBad(bad + 1);

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={increaseGood} text="Good" />
            <Button onClick={increaseNeutral} text="Neutral" />
            <Button onClick={increaseBad} text="Bad" />
            <Display good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
