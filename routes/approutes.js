const { Router } = require("express");
const router = Router();

const {
  appGet,
  nuevoUsuario,
  nuevoVetVeterinarys,
  appLogin,
} = require("../controllers/appcontroller");

//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys);
router.post("/registerowner", nuevoUsuario);
router.post("/registervet", nuevoVet);
router.post("/login", appLogin);

module.exports = router;
