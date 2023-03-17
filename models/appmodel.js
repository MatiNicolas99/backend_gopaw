const pool = require("../config/appconfig");
const bcrypt = require("bcryptjs");
const format = require("pg-format");

//Funciones para interacturar con la BD

const getVeterinarys = async () => {
  const { rows } = await pool.query(
    "SELECT veterinary.id, veterinary.veterinary_name, veterinary.phone, veterinary.email, veterinary.image from veterinary"
  );
  return rows;
};

const getReviews = async () => {
  const { rows } = await pool.query("SELECT * from review");
  return rows;
};

const getIdUsuarioPorEmail = async (email) => {
  const consulta = "SELECT id FROM owner WHERE email = $1";
  const values = [email];
  const { rows } = await pool.query(consulta, values);
  console.log(rows[0]);
  return rows[0];
};

const getPetById = async (id) => {
  const consulta = "SELECT pet.id, pet.pet_name, pet.birth_date, pet.type, pet.veterinary_id, owner.owner_name, veterinary.veterinary_name  FROM pet JOIN owner ON pet.owner_id = owner.id JOIN veterinary ON pet.veterinary_id = veterinary.id WHERE owner.id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  console.log(rows);
  return rows;
}

const getOwnerById = async (id) => {
  const consulta = "SELECT * FROM owner where owner.id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  // console.log(rows)
  return rows;
};

const getVeterinaryById = async (id) => {
  const consulta = "SELECT * FROM veterinary where veterinary.id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows;
};

const getVeterinaryByName = async (vetName) => {
  console.log(vetName)
  const consulta = "SELECT * FROM veterinary where veterinary.veterinary_name = $1";
  const values = [vetName];
  const {rows} = await pool.query(consulta, values);
  // console.log(rows)
  return rows
}

const getPetAppointments = async (id) => {
  const consulta = "SELECT * FROM appointment where appointment.pet_id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows;
};

const getVeterinaryAppointments = async (id) => {
  const consulta =
    "SELECT * FROM appointment INNER JOIN pet ON appointment.pet_id = pet.id INNER JOIN owner ON pet.owner_id = owner.id WHERE appointment.veterinary_id = $1";
    console.log(consulta);
    const values = [id];
  const { rows } = await pool.query(consulta, values);
  console.log(rows);
  return rows;
};

const registrarUsuario = async (owner) => {
  let { owner_name, phone, email, image, password, account_type } = owner;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [owner_name, phone, email, image, passwordEncriptada, account_type];
  const consulta = "INSERT INTO owner values (DEFAULT, $1, $2, $3, $4, $5, $6)";
  await pool.query(consulta, values);
};

const registrarVet = async (vet) => {
  let { veterinary_name, phone, email, image, password, account_type } = vet;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [veterinary_name, phone, email, image, passwordEncriptada, account_type];
  console.log(values);
  const consulta =
    "INSERT INTO veterinary values (DEFAULT, $1, $2, $3, $4, $5, $6)";
  await pool.query(consulta, values);
};

const registrarAppointment = async (appointment) => {
  let { date, pet_id, veterinary_id, hour } = appointment;
  const values = [date, pet_id, veterinary_id, hour];
  const consulta = "INSERT INTO appointment values (DEFAULT, $1, $2, $3, $4)";
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

const getReview = async (id) => {
  const consulta = "SELECT * FROM review WHERE veterinary_id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows;
};


const registrarReview= async (review) => {
  let { date, title, content, owner_id, veterinary_id } = review;
  const values = [date, title, content, owner_id, veterinary_id];
  const consulta = "INSERT INTO review values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const registrarPet = async (pet) => {
  let { pet_name, type, birth_date, owner_id, veterinary_id } = pet;
  const values = [pet_name, type, birth_date, owner_id, veterinary_id];
  const consulta = "INSERT INTO pet values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const verificarCredenciales = async (email, password) => {
  const consulta =
`SELECT * FROM owner WHERE email = $1 UNION SELECT * FROM veterinary WHERE email = $1`;
  const values = [email];

  const {
    rows: [data],
    rowCount,
  } = await pool.query(consulta, values);



  const { password: passwordEncriptada } = data;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" };

    return data;
};

const delAppointmentById = async (id) => {
  console.log(id);
  const consulta = "DELETE FROM appointment WHERE pet_id = $1";
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
  getPetById,
  getVeterinaryByName,
  getPetAppointments,
  getVeterinaryAppointments,
  getReview,
  //
  verificarCredenciales,
  //
  registrarUsuario,
  registrarVet,
  registrarReview,
  registrarPet,
  registrarAppointment,
  //
  delAppointmentById,
  delReviewById,
  //
  editReview,
  editOwner,
  editVeterinary,
  editOwnerPassword,
  editVeterinaryPassword,
};
