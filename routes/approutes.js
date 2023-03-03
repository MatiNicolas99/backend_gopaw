const { Router } = require("express");
const router = Router();

const {
  appGetVeterinarys,
  appGetReviews,
  appGetOwnerById,
  appGetVeterinaryById,
  appGetPetAppointments,
  appGetVeterinaryAppointments,
  //
  nuevoUsuario,
  nuevoVet,
  nuevaReseña,
  nuevaMascota,
  nuevoAppointment,
  //
  appLogin,
  // 
  appDelAppointmentById,
  appDelReviewById
} = require("../controllers/appcontroller");

//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys);
router.get("/reviews", appGetReviews);
router.get("/owner/:id", appGetOwnerById);
router.get("/veterinary/:id", appGetVeterinaryById);
router.get("/petappointments/:id", appGetPetAppointments);
router.get("/veterinaryappointments/:id", appGetVeterinaryAppointments);
// 
router.post("/login", appLogin);
router.post("/registerowner", nuevoUsuario);
router.post("/registervet", nuevoVet);
router.post("/registerreview", nuevaReseña);
router.post("/registerpet", nuevaMascota);
router.post("/registerappointment", nuevoAppointment);
// 
router.delete("/deleteappointment/:id", appDelAppointmentById);
router.delete("/deletereview/:id", appDelReviewById);


module.exports = router;
