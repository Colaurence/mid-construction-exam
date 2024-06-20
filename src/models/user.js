const db = require('../database');
const {v4: uuidv4} = require('uuid');

const createUser = async (name, email, password, role) => {
  const id = uuidv4();
  const query = `INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, name, email, password, role], function (err) {
      if (err) {
        if (
          err.message.includes(
            'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email'
          )
        ) {
          reject(new Error('Email already exists'));
        } else {
          reject(err);
        }
      } else {
        resolve({id, name, email, role});
      }
    });
  });
};

const findUserById = async (id) => {
  const query = `SELECT id, name, email FROM users WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const findUserByEmail = async (email) => {
  const query = `SELECT id, name, email, password, role FROM users WHERE email = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [email], (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const updateUser = async (id, name, email) => {
  const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [name, email, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({id, name, email});
      }
    });
  });
};

const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({id});
      }
    });
  });
};

const getAllUsers = async () => {
  const query = `SELECT id, name, email FROM users`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
};
