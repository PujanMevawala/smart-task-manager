const Task = require('../models/Task');
const Joi = require('joi');

// Validation schemas
const taskCreateSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('todo','in-progress','done').optional(),
  boardId: Joi.string().optional()
});

exports.createTask = async (req, res) => {
  try {
    const { error, value } = taskCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = await Task.create({
      ...value,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = { userId: req.user.id };
    if (req.query.boardId) filter.boardId = req.query.boardId;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, description, status, boardId } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (boardId !== undefined) task.boardId = boardId;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
