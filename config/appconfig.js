
const {Pool} = require('pg');


// Hay que cambiar esto para conectarse a una nueva BD
const pool = new Pool({
    user: "projectdbdl",
    host: "postgresql-projectdbdl.alwaysdata.net",
    password: "m4t1as94",
    database: "projectdbdl_joyas",
    port: 5432,
    allowExitOnIdle: true,
});

module.exports = pool;