import { useState } from "react";

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => (
    <p>
        {text}: {value}
    </p>
);

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
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={total} />
            <StatisticsLine text="Average" value={average} />
            <StatisticsLine
                text="Positive Percentage"
                value={`${positivePercentage}%`}
            />
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

    const increaseGood = () => {
        const nextValue = good + 1;
        setGood(nextValue);
        setTotal(total + 1);
        setIsFeedbackGiven(true);
    };
    const increaseNeutral = () => {
        const nextValue = neutral + 1;
        setNeutral(nextValue);
        setTotal(total + 1);
        setIsFeedbackGiven(true);
    };
    const increaseBad = () => {
        const nextValue = bad + 1;
        setBad(nextValue);
        setTotal(total + 1);
        setIsFeedbackGiven(true);
    };
    const findAverage = (good - bad) / (total === 0 ? 1 : total);
    const findPositivePercentage = (good / (total === 0 ? 1 : total)) * 100;

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
                    average={findAverage}
                    positivePercentage={findPositivePercentage}
                />
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    );
};

export default App;
