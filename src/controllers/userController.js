const userService = require('../services/userService');
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../utils/response');
const {transformUser} = require('../transformers/userTransformer');

const getAllUsers = async (req, res) => {
  const {page, perPage, searchQuery} = req.query;

  try {
    const users = await userService.getAllUsers(page, perPage, searchQuery);
    res.json(users);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const {token} = await userService.loginUser(email, password);
    res.json({token});
  } catch (err) {
    res.status(401).json(createErrorResponse(err.message));
  }
};

const createUser = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    const user = await userService.createUser(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const updateUser = async (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body;

  try {
    const user = await userService.updateUser(id, name, email);
    const responseData = createSuccessResponse(
      'User successfully updated',
      transformUser(user)
    );
    res.json(responseData);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

const deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedUser = await userService.deleteUser(id);
    const responseData = createSuccessResponse(
      'User successfully deleted',
      deletedUser
    );
    res.json(responseData);
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginUser,
};
