const pool = require("../config/appconfig");
const bcrypt = require("bcrypt");
const format = require("pg-format");

//Funciones para interacturar con la BD

const getVeterinarys = async () => {
  const {
    rows: [owners],
  } = await pool.query(
    "SELECT veterinary.id, veterinary.veterinary_name, veterinary.phone, veterinary.email, veterinary.image from veterinary"
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
  const consulta =
    "INSERT INTO veterinary values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const getReviews = async () => {
  const {
    rows: [reviews],
  } = await pool.query("");
  return reviews;
};

const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM owner WHERE email = $1";
  const values = [email];

  const {
    rows: [owner],
    rowCount,
  } = await pool.query(consulta, values);

  const { password: passwordEncriptada } = owner;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" };
};

// const getOwnerById = async (id) => {
//     const consulta = "SELECT * FROM owner where owner.id = $1";
//     const values = [id];
//     const { rowCount } = await pool.query(consulta, values);
//     if (!rowCount)
//       throw { code: 404, message: "No se encontró ningún dueño con este ID" };
//   };

module.exports = {
  getVeterinarys,
  getReviews,
  verificarCredenciales,
  //  getOwnerById,
  registrarUsuario,
  registrarVet,
};
