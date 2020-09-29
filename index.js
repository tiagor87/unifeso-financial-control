const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let dictionary = {};
let id = 0;

// CREATE
app.post('/', (request, response) => {
    const obj = request.body;
    dictionary[++id] = obj;
    obj.id = id;
    if (!obj) {
        return response.status(412)
            .send({
                message: 'O corpo da mensagem é obrigatório'
            });
    }
    response
        .status(201)
        .send(obj);
});

// READ
app.get('/:id', (request, response) => {
    const obj = dictionary[request.params.id];
    if (!obj) {
        return response.status(404).send({
            message: 'Not found'
        });
    }
    response.status(200).send(obj);
});

// UPDATE
app.put('/:id', (request, response) => {
    const obj = request.body;
    dictionary[request.params.id] = obj;
    if (!obj) {
        return response.status(412)
            .send({
                message: 'O corpo da mensagem é obrigatório'
            });
    }
    response
        .status(200)
        .send(obj);
});

// DELETE
app.delete('/:id', (request, response) => {
    dictionary[request.params.id] = null;
    response.status(204).end();
});

const port = 8090;
app.listen(port);