const {
  getVeterinarys,
  getReviews,
  getOwnerById,
  getVeterinaryById,
  verificarCredenciales,
  registrarVet,
  registrarUsuario,
  getIdUsuarioPorEmail,
  registrarReviewConToken,
  registrarPetConToken,
  registrarAppointment,
} = require("../models/appmodel");
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

const appGetReviews = async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetOwnerById = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    const owner = await getOwnerById(id);
    res.json(owner);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetVeterinaryById = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    const veterinary = await getVeterinaryById(id);
    res.json(veterinary);
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
const appLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: 1800 });
    console.log(token);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
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

const nuevaReseña = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    const idUsuario = await getIdUsuarioPorEmail(email);
    const review = req.body;
    await registrarReviewConToken(review, idUsuario);
    res.send("Review registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

const nuevaMascota = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    const idUsuario = await getIdUsuarioPorEmail(email);
    const pet = req.body;
    await registrarPetConToken(pet, idUsuario);
    res.send("Pet registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

const nuevoAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    await registrarAppointment(appointment);
    res.send("Appointment registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  appGetVeterinarys,
  appGetReviews,
  appGetOwnerById,
  appGetVeterinaryById,
  appLogin,
  nuevoUsuario,
  nuevoVet,
  nuevaReseña,
  nuevaMascota,
  nuevoAppointment,
};
