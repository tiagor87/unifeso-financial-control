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
app.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user == null) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  response.status(200).send(user);
});

// UPDATE
app.put("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true
    });
    if (user == null) {
      return response.status(404).send({
        message: "Usuário não encontrado."
      });
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({
      message: error.toString()
    });
  }
});

// DELETE
app.delete("/:id", async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (user == null) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  response.status(204).end();
});

const port = 8090;
app.listen(port, () => console.log(`Rodando em localhost:${port}`));
