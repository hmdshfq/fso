import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({courses}) => {
    return (
        courses.map( course => {
            return (
                <section key={course.id}>
                    <Header course={course.name}/>
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </section>
            )
        })
    )
};

export default Course;