const pool = require("../config/appconfig");
const bcrypt = require('bcryptjs');
//Funciones para interacturar con la BD

const getOwners = async () => {
  const {
    rows: [owners],
  } = await pool.query(
    "SELECT pet.pet_name, pet.type, owner.owner_name  FROM pet join owner on pet.owner_id = owner.id"
  );
  return owners;
};

const registrarUsuario = async (owner) => {
  let { owner_name, phone, email, image, password } = owner;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [owner_name, phone, email, image, passwordEncriptada];
  const consulta = "INSERT INTO owner values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const registrarVet = async (vet) => {
  let { veterinary_name, phone, email, image, password } = vet;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [veterinary_name, phone, email, image, passwordEncriptada];
  const consulta = "INSERT INTO veterinary values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

module.exports = {
  getOwners,
  registrarUsuario,
  registrarVet
};
