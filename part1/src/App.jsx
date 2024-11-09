import Header from './Header';
import Content from './Content';
import Total from './Total'

const App = () => {
    const course = 'Half Stack application development';
    const content = [
        {
            id: 0,
            name: 'Fundamentals of React',
            exercises: 10,
        },
        {
            id: 1,
            name: 'Using props to pass data',
            exercises: 7,
        },
        {
            id: 2,
            name: 'State of a component',
            exercises: 14,
        },
    ]
    const total = content.reduce((accumulator, object) => accumulator + object.exercises, 0);

    return (
        <div>
            <Header course={course} />
            {
                content.map(({id, name, exercises}) => {
                    return <Content key={id} name={name} exercises={exercises} />
                })
            }
            <Total total={total} />
        </div>
    );
};

export default App;
