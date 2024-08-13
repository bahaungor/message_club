// IMPORT USEFUL MIDDLEWARES
const bcrypt = require('bcryptjs');

// IMPORT CONNECTION POOL
const pool = require('./pool');

async function createNewUser(firstName, lastName, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
  const query = 'INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [firstName, lastName, username, hashedPassword]);
}

async function getUserByID(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

async function getMessages() {
  const { rows } = await pool.query('SELECT title, message, username, messages.creationDate FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.creationDate DESC');
  return rows;
}

async function postMessage(user_id, title, message) {
  const query = 'INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)';
  // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
  await pool.query(query, [user_id, title, message]);
}

module.exports = { createNewUser, getUserByID, getUserByUsername, getMessages, postMessage };
