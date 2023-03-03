
const {Pool} = require('pg');


// Hay que cambiar esto para conectarse a una nueva BD
const pool = new Pool({
    user: "andres",
    host: "postgresql-andres.alwaysdata.net",
    password: "andres123..",
    database: "andres_gopaw",
    port: 5432,
    allowExitOnIdle: true,
});

module.exports = pool;