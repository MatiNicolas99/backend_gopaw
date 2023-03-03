
const { Router } = require('express');
const router = Router();

const { appGet } = require('../controllers/appcontroller');


//Incluir las rutas que correspondan
router.get("/owners", appGet );


module.exports = router;