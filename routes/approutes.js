const { Router } = require("express");
const router = Router();

const {
  appGetVeterinarys,
  appGetReviews,
  appGetOwnerById,
  appGetVeterinaryById,
  nuevoUsuario,
  nuevoVet,
  appLogin,
} = require("../controllers/appcontroller");

//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys);
router.get("/reviews", appGetReviews);
router.get("/owner/:id", appGetOwnerById);
router.get("/veterinary/:id", appGetVeterinaryById);
router.post("/registerowner", nuevoUsuario);
router.post("/registervet", nuevoVet);
router.post("/login", appLogin);

module.exports = router;
