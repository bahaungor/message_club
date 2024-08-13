require('dotenv').config();
const process = require('node:process');

const { Pool } = require('pg');

// BOTH METHOD IS OK
module.exports = new Pool({
  connectionString: process.env.PG_URI,
});
