const { Router } = require("express");
const router = Router();

const {
  appGetVeterinarys,
  nuevoUsuario,
  nuevoVet,
  appLogin,
  verificarUsuario,
  nuevaReseña,
  nuevaMascota,
  nuevoAppointment,
} = require("../controllers/appcontroller");

//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys);
router.post("/registerowner", nuevoUsuario);
router.post("/registervet", nuevoVet);
router.post("/login", appLogin);
router.post("/review", nuevaReseña);
router.post("/pet", nuevaMascota);
router.post("/appointment", nuevoAppointment)

module.exports = router;
