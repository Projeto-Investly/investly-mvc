const express = require("express");
const app = express();
const porta = 3000;

// Arquivos estáticos: CSS, JS e imagens
app.use(express.static("./app/public"));

// EJS
app.set("view engine", "ejs");
app.set("views", "./app/views");

// Dados enviados por formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const rota = require("./app/routes/router");
app.use("/", rota);

// Servidor
app.listen(porta, () => {
    console.log(`Servidor on-line\nhttp://localhost:${porta}`);
});