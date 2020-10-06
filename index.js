const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models");

mongoose.connect(
  "mongodb+srv://unifeso:unifeso-password@unifeso.kwuxv.gcp.mongodb.net/unifeso-financial-control?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected.");
});

const dictionary = {};

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CREATE
app.post("/", async (request, response) => {
  const jsonContent = request.body;
  // User -> objeto responsável por acessar o banco de dados.
  const user = await User.create(jsonContent);
  response.status(201).send(user);
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
  if (!dictionary[request.params.id]) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  dictionary[request.params.id] = obj;
  response.status(200).send(obj);
});

// DELETE
app.delete("/:id", (request, response) => {
  if (!dictionary[request.params.id]) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  dictionary[request.params.id] = null;
  response.status(204).end();
});

const port = 8090;
app.listen(port, () => console.log(`Rodando em localhost:${port}`));
