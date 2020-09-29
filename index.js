const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://unifeso:unifeso-password@unifeso.kwuxv.gcp.mongodb.net/financial-control?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected.");
});

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let dictionary = {};
let id = 0;

// CREATE
app.post("/", (request, response) => {
  const obj = request.body;
  if (!obj) {
    return response.status(412).send({
      message: "O corpo da mensagem é obrigatório"
    });
  }
  dictionary[++id] = obj;
  obj.id = id;
  response.status(201).send(obj);
});

// READ
app.get("/:id", (request, response) => {
  const obj = dictionary[request.params.id];
  if (!obj) {
    return response.status(404).send({
      message: "Not found"
    });
  }
  response.status(200).send(obj);
});

// UPDATE
app.put("/:id", (request, response) => {
  const obj = request.body;
  dictionary[request.params.id] = obj;
  if (!obj) {
    return response.status(412).send({
      message: "O corpo da mensagem é obrigatório"
    });
  }
  response.status(200).send(obj);
});

// DELETE
app.delete("/:id", (request, response) => {
  dictionary[request.params.id] = null;
  response.status(204).end();
});

const port = 8090;
app.listen(port, () => console.log(`Rodando em localhost:${port}`));
