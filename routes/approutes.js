
const { Router } = require('express');
const router = Router();

const { appGet, nuevoUsuario, nuevoVet } = require('../controllers/appcontroller');


//Incluir las rutas que correspondan
router.get("/owners", appGet );
router.post("/registerowner", nuevoUsuario );
router.post("/registervet", nuevoVet);

module.exports = router;