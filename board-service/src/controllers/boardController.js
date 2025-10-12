const Board = require('../models/Board');

// @desc    Get all boards of logged-in user
// @route   GET /api/boards
// @access  Private
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user.id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get a single board
// @route   GET /api/boards/:id
// @access  Private
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    // check membership
    if (!board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Create a new board
// @route   POST /api/boards
// @access  Private
exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const board = new Board({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Private
exports.updateBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    let board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (board.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    board.name = name || board.name;
    board.description = description || board.description;

    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete a board
// @route   DELETE /api/boards/:id
// @access  Private
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (board.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await board.deleteOne();
    res.json({ message: 'Board removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
