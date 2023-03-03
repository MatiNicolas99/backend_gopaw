const {getVeterinarys, verificarCredenciales} = require("../models/appmodel");
const jwt = require("jsonwebtoken");

// Actualizar según lo que corresp
const appGetVeterinarys = async (req, res) => {
  try {
    const owners = await getVeterinarys();
    res.json(owners);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ", {expiresIn: 1800});
    console.log(token)
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};


module.exports = {
  appGetVeterinarys,
  appLogin
};
