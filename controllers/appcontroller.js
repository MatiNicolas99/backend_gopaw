const { getOwners, registrarVet, registrarUsuario } = require("../models/appmodel");

// Actualizar según lo que corresp
const appGet = async (req, res) => {
  try {
    const owners = await getOwners();
    res.json(owners);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const nuevoUsuario = async (req, res) => {
  try {
    const owner = req.body;
    await registrarUsuario(owner);
    res.send("Dueño registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

const nuevoVet = async (req, res) => {
  try {
    const vet = req.body;
    await registrarVet(vet);
    res.send("Veterinario registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  appGet,
  nuevoUsuario,
  nuevoVet,
};
