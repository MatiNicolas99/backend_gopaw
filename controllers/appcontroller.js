const {} = require("../models/appmodel");

// Actualizar según lo que corresp
const appGet = async (req, res) => {
  try {
    res.json("Probando sistema");
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
};

module.exports = {
  appGet,
};
