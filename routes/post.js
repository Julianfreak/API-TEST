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
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Prueba.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!actualizado) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Prueba.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }
    res.json({ mensaje: "Documento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
