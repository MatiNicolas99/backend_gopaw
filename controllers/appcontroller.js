const {
  getVeterinarys,
  getReviews,
  getOwnerById,
  getVeterinaryById,
  getVeterinaryByName,
  getPetAppointments,
  getPetById,
  getVeterinaryAppointments,
  getIdUsuarioPorEmail,
  getReview,
  // 
  verificarCredenciales,
  // 
  registrarVet,
  registrarUsuario,
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
    // const formatedData = reviews.map(item => ({
    //   id: item.id,
    //   date: item.date.toLocaleDateString("en-ES"),
    //   title: item.title,
    //   content: item.content,
    //   owner_id: item.owner_id,
    //   veterinary_id: item.veterinary_id
    // }));
    console.log(formatedData)
    res.json(reviews);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetPetById = async (req, res) => {
  try {
    const  {id}  = req.params;
    // console.log(id)
    // 
    // 
    // 
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    const data = await getPetById(id);
    res.json(data);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
}

const appGetOwnerById = async (req, res) => {
  try {
    const  {id}  = req.params;
    // console.log(id)
    // 
    // 
    // 
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    const data = await getOwnerById(id);
    res.json(data);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetVeterinaryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    const veterinary = await getVeterinaryById(id);
    res.json(veterinary);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetVeterinaryByName = async (req, res) => {
  try{
    const {veterinary_name}= req.body;
    // console.log(veterinary_name)
    const results = await getVeterinaryByName(veterinary_name)
    res.json(results)
  }catch(error){
    res.status(error.code || 500).send(error);
  }
}

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
    const { id } = req.params;
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    const veterinaryAppointments = await getVeterinaryAppointments(id);
    res.json(veterinaryAppointments);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const appGetReview = async (req, res) => {
  try {
    const { id } = req.params;
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    const vetReview = await getReview(id);
    console.log(vetReview)
    res.json(vetReview);
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
    const data = await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: 1800 });
    const accountType = data.account_type
    const id = data.id  
    res.send({token,accountType, id});
  } catch (error) {    
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
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    // const { email } = jwt.decode(token);
    // const idUsuario = await getIdUsuarioPorEmail(email);
    const review = req.body;
    await registrarReview(review);
    res.send("Review registrado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
};

const nuevaMascota = async (req, res) => {
  try {
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
    // const { email } = jwt.decode(token);
    // const idUsuario = await getIdUsuarioPorEmail(email);
    const pet = req.body;
    await registrarPet(pet);
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
    const { id } = req.params;
    console.log(id);
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
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
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
    // const Authorization = req.header("Authorization");
    // const token = Authorization.split("Bearer ")[1];
    // jwt.verify(token, "az_AZ");
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
  appGetVeterinaryByName,
  appGetPetById,
  appGetPetAppointments,
  appGetVeterinaryAppointments,
  appLogin,
  appGetReview,

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
