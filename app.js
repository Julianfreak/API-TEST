const express = require("express");
const mongoose = require("mongoose");
const Prueba = require("./models/prueba");
const postRoutes = require("./routes/post");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());

const uri = process.env.MONGODB_URI;;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Conectado a MongoDB Atlas con Mongoose");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("¡Hola desde la API!");
});

app.use("/pruebas", postRoutes); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
