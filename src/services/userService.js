const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  validateCreateUser,
  validateUpdateUser,
} = require('../validators/userValidator');
const {transformUser} = require('../transformers/userTransformer');
const paginate = require('../utils/paginator');

const getAllUsers = async (page = 1, perPage = 10, searchQuery = '') => {
  try {
    const users = await userModel.getAllUsers();
    const paginatedResult = paginate(
      users.map((user) => transformUser(user)),
      page,
      perPage,
      searchQuery
    );
    return paginatedResult;
  } catch (err) {
    throw new Error(err.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    return {token};
  } catch (err) {
    throw new Error(err.message);
  }
};

const createUser = async (name, email, password, role) => {
  try {
    const validationResult = validateCreateUser({name, email, password, role});
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }
    const hashedPassword = await hashPassword(password);
    const user = await userModel.createUser(name, email, hashedPassword, role);

    return transformUser(user);
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUser = async (id, name, email) => {
  try {
    const validationResult = validateUpdateUser({name, email});
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }

    const user = await userModel.updateUser(id, name, email);
    return transformUser(user);
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.deleteUser(id);
    return deletedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateToken = (user) => {
  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(tokenPayload, process.env.SECRET_KEY, {expiresIn: '1h'});
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

module.exports = {
  getAllUsers,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
