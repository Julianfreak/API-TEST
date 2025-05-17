const express = require("express");
const mongoose = require("mongoose");
const Prueba = require("./models/prueba");
const postRoutes = require("./routes/post");
const app = express();
const port = 3000;

app.use(express.json());

const uri = "mongodb+srv://julianrideon:BFstmngjpCbzBXnB@cluster0.wnhvnr4.mongodb.net/API_REST?retryWrites=true&w=majority";

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

app.post("/pruebas", async (req, res) => {
  try {
    const nuevo = new Prueba(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/pruebas", async (req, res) => {
  try {
    const pruebas = await Prueba.find();
    res.json(pruebas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/pruebas", postRoutes); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
