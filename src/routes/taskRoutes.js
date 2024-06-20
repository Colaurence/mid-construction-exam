const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {authenticateToken, authorizeUser} = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, taskController.createTask);
router.put('/:id', authenticateToken, authorizeUser(['admin']), taskController.updateTask);
router.delete('/:id', authenticateToken, authorizeUser(['admin']), taskController.deleteTask);
router.get('/', authenticateToken, taskController.getAllTasks);
router.get('/user', authenticateToken, taskController.getTasksByUserId);

module.exports = router;
