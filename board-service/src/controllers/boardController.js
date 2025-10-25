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

// @desc    Add member to board
// @route   POST /api/boards/:id/members
// @access  Private
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (board.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only board owner can add members' });
    }

    if (board.members.includes(userId)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    board.members.push(userId);
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Remove member from board
// @route   DELETE /api/boards/:id/members/:userId
// @access  Private
exports.removeMember = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (board.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only board owner can remove members' });
    }

    if (req.params.userId === board.createdBy.toString()) {
      return res.status(400).json({ message: 'Cannot remove board owner' });
    }

    board.members = board.members.filter(m => m.toString() !== req.params.userId);
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
