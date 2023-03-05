const {
  getVeterinarys,
  getReviews,
  getOwnerById,
  getVeterinaryById,
  getPetAppointments,
  getVeterinaryAppointments,
  getIdUsuarioPorEmail,
  // 
  verificarCredenciales,
  // 
  registrarVet,
  registrarUsuario,
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
} = require("../models/appmodel");
const jwt = require("jsonwebtoken");

// Actualizar según lo que corresp
const appGetVeterinarys = async (req, res) => {
  try {
    const veterinarys = await getVeterinarys();
    res.json(veterinarys);
  } catch (error) {
    res.status(500).send({message: 'Something went wrong'});
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
    const owner = await getOwnerById(id);
    res.json(owner);
    console.log(owner)
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
    const veterinary = await getVeterinaryById(id);
    res.json(veterinary);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetPetAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const petAppointments = await getPetAppointments(id);
    res.json(petAppointments);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetVeterinaryAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    const veterinaryAppointments = await getVeterinaryAppointments(id);
    res.json(veterinaryAppointments);
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

const appDelAppointmentById = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await delAppointmentById(id);
    res.send("Appointment eliminado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

const appDelReviewById = async (req, res) => {
  try {
    const { id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await delReviewById(id);
    res.send("Review eliminado con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appPutReview = async (req, res) => {
  try {
    const { id, date, title, content } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await editReview(id, date, title, content);
    res.send("Review editado con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appPutOwner = async (req, res) => {
  try {
    const { id, owner_name, phone, email, image} = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await editOwner(id, owner_name, phone, email, image);
    res.send("Dueño editado con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appPutVeterinary = async (req, res) => {
  try {
    const { id, veterinary_name, phone, email, image} = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await editVeterinary(id, veterinary_name, phone, email, image);
    res.send("Veterinario editado con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appPutOwnerPassword = async (req, res) => {
  try {
    const { id, password} = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await editOwnerPassword(id, password);
    res.send("Contraseña editada con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appPutVeterinaryPassword = async (req, res) => {
  try {
    const { id, password} = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, "az_AZ");
    await editVeterinaryPassword(id, password);
    res.send("Contraseña editada con éxito");
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  appGetVeterinarys,
  appGetReviews,
  appGetOwnerById,
  appGetVeterinaryById,
  appGetPetAppointments,
  appGetVeterinaryAppointments,
  appLogin,
  // 
  nuevoUsuario,
  nuevoVet,
  nuevaReseña,
  nuevaMascota,
  nuevoAppointment,
  // 
  appDelAppointmentById,
  appDelReviewById,
  // 
  appPutReview,
  appPutOwner,
  appPutVeterinary,
  appPutOwnerPassword,
  appPutVeterinaryPassword
};
