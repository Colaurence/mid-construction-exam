const taskModel = require('../models/task');
const paginate = require('../utils/paginator');
const {
  validateCreateTask,
  validateUpdateTask,
} = require('../validators/taskValidator');
const {transformTask} = require('../transformers/taskTransformer');

const getAllTasks = async (page = 1, perPage = 10, searchQuery = '') => {
  try {
    const tasks = await taskModel.getAllTasks();
    return paginate(tasks.map(transformTask), page, perPage, searchQuery);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getTasksByUserId = async (userId) => {
  try {
    return await taskModel.getTasksByUserId(userId);
  } catch (err) {
    throw new Error(err.message);
  }
};

const createTask = async (title, description, status, userId) => {
  try {
    const task = {title, description, status, userId};
    const validationResult = validateCreateTask(task);
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }

    return await taskModel.createTask(title, description, status, userId);
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateTask = async (id, title, description, status) => {
  try {
    const validationResult = validateUpdateTask({title, description, status});
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }

    const updatedTask = await taskModel.updateTask(
      id,
      title,
      description,
      status
    );
    return transformTask(updatedTask);
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteTask = async (id) => {
  try {
    return await taskModel.deleteTask(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllTasks,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};
