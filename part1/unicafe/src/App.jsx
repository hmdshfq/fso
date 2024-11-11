import { useState } from "react";

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({
    good,
    neutral,
    bad,
    total,
    average,
    positivePercentage,
}) => {
    return (
        <>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {total}</p>
            <p>Average: {average}</p>
            <p>Positive Percentage: {positivePercentage}%</p>
        </>
    );
};

const App = () => {
    const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);
    const [positivePercentage, setPositivePercentage] = useState(0);

    const increaseGood = () => {
        const nextValue = good + 1;
        setGood(nextValue);
        setTotal(total + 1);
        findAverage();
        findPositivePercentage();
        setIsFeedbackGiven(true);
    };
    const increaseNeutral = () => {
        const nextValue = neutral + 1;
        setNeutral(nextValue);
        setTotal(total + 1);
        findAverage();
        findPositivePercentage();
        setIsFeedbackGiven(true);
    };
    const increaseBad = () => {
        const nextValue = bad + 1;
        setBad(nextValue);
        setTotal(total + 1);
        findAverage();
        findPositivePercentage();
        setIsFeedbackGiven(true);
    };
    const findAverage = () => {
        setAverage((good - bad) / (total === 0 ? 1 : total));
    };
    const findPositivePercentage = () => {
        setPositivePercentage((good / total) * 100);
    };

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={increaseGood} text="Good" />
            <Button onClick={increaseNeutral} text="Neutral" />
            <Button onClick={increaseBad} text="Bad" />
            <h2>Statistics</h2>
            {isFeedbackGiven ? (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={total}
                    average={average}
                    positivePercentage={positivePercentage}
                />
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    );
};

export default App;
