# Aula 05

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
