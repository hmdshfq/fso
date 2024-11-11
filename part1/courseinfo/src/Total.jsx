function Total({ parts }) {
    const total = parts.reduce((acc, object) => {
        return acc + object.exercises;
    }, 0)
    return <p>Number of exercises {total}</p>;
}

export default Total;
