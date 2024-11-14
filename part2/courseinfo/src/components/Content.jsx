import Part from './Part';

function Content({ parts }) {
    return parts.map((part, index) => (
        <Part key={index} part={part} />
    ));
}

export default Content;
