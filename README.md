# Projeto Web

## Passo a passo configuração

```bash
npm init
```

## Acesso a dados

### Instalando pacote [mongoose](https://mongoosejs.com/docs/)

```bash
npm i mongoose --save
```

### Conectando ao mongoose

```nodejs
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
```

## Coleção Postman

[Link da coleção](https://www.getpostman.com/collections/0a38db065c1b07d977ab)

## Docs

- [MarvelApp](marvelapp.com/prototype/12e93d2e)
- [Requisitos](docs.google.com/document/d/1-tF9KOeFZ3E_6utGECMkF-_18YvlFq5PJoDBpQ5gRb4/edit?usp=sharing)
