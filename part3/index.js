const express = require('express');

const PORT = 3000;

const server = express();

const notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true,
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

server.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

server.get('/api/notes', (request, response) => {
    response.json(notes);
});

server.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find( note => note.id === id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

