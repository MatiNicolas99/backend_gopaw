
const { Router } = require('express');
const router = Router();

const { appGetVeterinarys, appLogin } = require('../controllers/appcontroller');


//Incluir las rutas que correspondan
router.get("/veterinarys", appGetVeterinarys );
router.post("/login", appLogin)


module.exports = router;