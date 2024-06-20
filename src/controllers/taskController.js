const taskService = require('../services/taskService');
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../utils/response');
const {transformTask} = require('../transformers/taskTransformer');

const getAllTasks = async (req, res) => {
  const {page, perPage, searchQuery} = req.query;

  try {
    const paginatedData = await taskService.getAllTasks(
      page,
      perPage,
      searchQuery
    );
    res.json(paginatedData);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

const getTasksByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks.map((task) => transformTask(task)));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

const createTask = async (req, res) => {
  try {
    const {title, description} = req.body;
    const userId = req.user.id;
    const task = await taskService.createTask(
      title,
      description,
      undefined,
      userId
    );
    res
      .status(201)
      .json(
        createSuccessResponse('Task successfully created', transformTask(task))
      );
  } catch (error) {
    res.status(400).json(createErrorResponse(error.message));
  }
};

const updateTask = async (req, res) => {
  const {id} = req.params;
  const {title, description, status} = req.body;

  try {
    const updatedTask = await taskService.updateTask(
      id,
      title,
      description,
      status
    );
    const responseData = createSuccessResponse(
      'Task successfully updated',
      transformTask(updatedTask)
    );
    res.json(responseData);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

const deleteTask = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedTask = await taskService.deleteTask(id);
    const responseData = createSuccessResponse(
      'Task successfully deleted',
      deletedTask
    );
    res.json(responseData);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksByUserId,
};
