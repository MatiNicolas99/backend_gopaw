const { Router } = require("express");
const router = Router();

const {
  appGetVeterinarys,
  appGetReviews,
  appGetOwnerById,
  appGetVeterinaryById,
  appGetVeterinaryByName,
  appGetPetById,
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
  appDelReviewById,
  // 
  appPutReview,
  appPutOwner,
  appPutVeterinary,
  appPutOwnerPassword,
  appPutVeterinaryPassword
} = require("../controllers/appcontroller");

//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys);
router.get("/reviews", appGetReviews);
router.get("/owner/:id", appGetOwnerById);
router.get("/veterinary/:id", appGetVeterinaryById);
router.get("/petappointments/:id", appGetPetAppointments);

router.get("/pet/:id", appGetPetById);
router.get("/veterinaryappointments/:id", appGetVeterinaryAppointments);
router.get("/veterinaryName", appGetVeterinaryByName);
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
// 
router.put("/editreview/:id", appPutReview);
router.put("/editowner/:id", appPutOwner);
router.put("/editveterinary/:id", appPutVeterinary);
router.put("/editownerpassword/:id", appPutOwnerPassword);
router.put("/editveterinarypassword/:id", appPutVeterinaryPassword);


module.exports = router;
