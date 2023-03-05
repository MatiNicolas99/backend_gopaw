const pool = require("../config/appconfig");
const bcrypt = require("bcryptjs");
const format = require("pg-format");

//Funciones para interacturar con la BD

const getVeterinarys = async () => {
  const {rows} = await pool.query(
    "SELECT veterinary.id, veterinary.veterinary_name, veterinary.phone, veterinary.email, veterinary.image from veterinary"
  );
  return rows;
};

const getReviews = async () => {
  const {rows} = await pool.query("SELECT * from review");
  return rows;
};

const getIdUsuarioPorEmail = async (email) => {
  const consulta = "SELECT id FROM owner WHERE email = $1";
  const values = [email];
  const { rows } = await pool.query(consulta, values);
  console.log(rows[0]);
  return rows[0];
};

const getOwnerById = async (id) => {
  const consulta = "SELECT * FROM owner where owner.id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows
};

const getVeterinaryById = async (id) => {
  const consulta = "SELECT * FROM veterinary where veterinary.id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows
};

const getPetAppointments = async (id) => {
  const consulta = "SELECT * FROM appointment where appointment.pet_id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows
};

const getVeterinaryAppointments = async (id) => {
  const consulta = "SELECT * FROM appointment where appointment.veterinary_id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows
};

const registrarUsuario = async (owner) => {
  let { owner_name, phone, email, image, password } = owner;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [owner_name, phone, email, image, passwordEncriptada];
  const consulta = "INSERT INTO owner values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const registrarVet = async (vet) => {
  let { veterinary_name, phone, email, password, image } = vet;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [veterinary_name, phone, email, image, passwordEncriptada];
  console.log(values);
  const consulta =
    "INSERT INTO veterinary values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const registrarAppointment = async (appointment) => {
  let { date, pet_name, veterinary_name } = appointment;
  const idPet = await getPetByName(pet_name);
  const idVet = await getVetByName(veterinary_name);
  const values = [date, idPet.id, idVet.id];
  const consulta = "INSERT INTO appointment values (DEFAULT, $1, $2, $3)";
  await pool.query(consulta, values);
};

const getPetByName = async (pet_name) => {
  const consulta = "SELECT id FROM pet WHERE pet_name = $1";
  const values = [pet_name];
  const { rows } = await pool.query(consulta, values);
  console.log(rows[0]);
  return rows[0];
};

const getVetByName = async (veterinary_name) => {
  const consulta = "SELECT id FROM veterinary WHERE veterinary_name = $1";
  const values = [veterinary_name];
  const { rows } = await pool.query(consulta, values);
  console.log(rows[0]);
  return rows[0];
};

const registrarReviewConToken = async (review, idUsuario) => {
  let { date, title, content, idVet } = review;
  const values = [date, title, content, idUsuario.id, idVet];
  const consulta = "INSERT INTO review values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const registrarPetConToken = async (pet, idUsuario) => {
  let { pet_name, type, birth_date, idVet } = pet;
  const values = [pet_name, type, birth_date, idUsuario.id, idVet];
  const consulta = "INSERT INTO pet values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
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

const delAppointmentById = async (id) => {
  const consulta = "DELETE FROM appointment WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw { code: 404, message: "No se encontró ningúna cita con este ID" };
};

const delReviewById = async (id) => {
  const consulta = "DELETE FROM review WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw { code: 404, message: "No se encontró ningún review con este ID" };
};

const editReview = async (id, date, title, content) => {
  const consulta =
    "UPDATE review SET date = $2, title = $3, content = $4 WHERE id = $1";
  const values = [id, date, title, content];
  await pool.query(consulta, values);
};

const editOwner = async (id, owner_name, phone, email, image) => {
  const consulta =
    "UPDATE owner SET owner_name = $2, phone = $3, email = $4, image = $5 WHERE id = $1";
  const values = [id, owner_name, phone, email, image];
  await pool.query(consulta, values);
};

const editVeterinary = async (id, veterinary_name, phone, email, image) => {
  const consulta =
    "UPDATE veterinary SET veterinary_name = $2, phone = $3, email = $4, image = $5 WHERE id = $1";
  const values = [id, veterinary_name, phone, email, image];
  await pool.query(consulta, values);
};

const editOwnerPassword = async (id, password) => {
  const consulta = "UPDATE owner SET password = $2 WHERE id = $1";
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [id, passwordEncriptada];
  await pool.query(consulta, values);
};

const editVeterinaryPassword = async (id, password) => {
  const consulta = "UPDATE veterinary SET password = $2 WHERE id = $1";
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [id, passwordEncriptada];
  await pool.query(consulta, values);
};

module.exports = {
  getVeterinarys,
  getReviews,
  getIdUsuarioPorEmail,
  getOwnerById,
  getVeterinaryById,
  getPetAppointments,
  getVeterinaryAppointments,
  // 
  verificarCredenciales,
  // 
  registrarUsuario,
  registrarVet,
  registrarReviewConToken,
  registrarPetConToken,
  registrarAppointment,
  // 
  delAppointmentById,
  delReviewById,
  // 
  editReview,
  editOwner,
  editVeterinary,
  editOwnerPassword,
  editVeterinaryPassword
};
