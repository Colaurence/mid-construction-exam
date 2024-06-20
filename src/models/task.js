const db = require('../database');
const {v4: uuidv4} = require('uuid');

const createTask = async (title, description, status = 0, userId) => {
  const id = uuidv4();
  const query = `
      INSERT INTO tasks (id, title, description, status, userId)
      VALUES (?, ?, ?, ?, ?)
    `;
  return new Promise((resolve, reject) => {
    db.run(query, [id, title, description, status, userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({id, title, description, status, userId});
      }
    });
  });
};

const getTasksByUserId = async (userId) => {
  const query = `SELECT id, title, description, status FROM tasks WHERE userId = ?`;
  return new Promise((resolve, reject) => {
    db.all(query, [userId], (err, tasks) => {
      if (err) {
        reject(err);
      } else {
        resolve(tasks);
      }
    });
  });
};

const updateTask = async (id, title, description, status) => {
  const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [title, description, status, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({id, title, description, status});
      }
    });
  });
};

const deleteTask = async (id) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
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

const getAllTasks = async () => {
  const query = `SELECT id, title, description, status FROM tasks`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, tasks) => {
      if (err) {
        reject(err);
      } else {
        resolve(tasks);
      }
    });
  });
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
  getAllTasks,
};
