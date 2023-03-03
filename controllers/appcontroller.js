const {getOwners} = require("../models/appmodel");

// Actualizar según lo que corresp
const appGet = async (req, res) => {
  try {
    const owners = await getOwners();
    res.json(owners);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};





module.exports = {
  appGet,
};
