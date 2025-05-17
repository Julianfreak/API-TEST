const express = require("express");
const router = express.Router();
const Prueba = require("../models/prueba");

router.post("/", async (req, res) => {
  try {
    const nuevo = new Prueba(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pruebas = await Prueba.find();
    res.json(pruebas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
