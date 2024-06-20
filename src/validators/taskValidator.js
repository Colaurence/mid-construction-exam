const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.boolean().default(false),
  userId: Joi.string().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.boolean().default(false),
});

const validateCreateTask = (task) => createTaskSchema.validate(task);
const validateUpdateTask = (task) => updateTaskSchema.validate(task);

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
