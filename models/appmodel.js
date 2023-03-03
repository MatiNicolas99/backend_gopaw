const pool = require("../config/appconfig");
const format = require("pg-format");

//Funciones para interacturar con la BD

const getOwners = async () => {
    const { rows: [owners] } = await pool.query("SELECT pet.pet_name, pet.type, owner.owner_name  FROM pet join owner on pet.owner_id = owner.id");
    return owners;
  };

module.exports = {
 getOwners

};
