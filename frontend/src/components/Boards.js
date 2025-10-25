import React, { useState, useEffect } from 'react';
import { boardService } from '../services/taskService';
import './Boards.css';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBoard, setEditingBoard] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const data = await boardService.getBoards();
            setBoards(data);
        } catch (err) {
            console.error('Boards fetch error:', err);
            setError(err.response?.data?.message || 'Failed to fetch boards');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingBoard) {
                await boardService.updateBoard(editingBoard._id, formData);
            } else {
                await boardService.createBoard(formData);
            }

            await fetchBoards();
            setShowModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save board');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this board?')) return;

        try {
            await boardService.deleteBoard(id);
            await fetchBoards();
        } catch (err) {
            setError('Failed to delete board');
        }
    };

    const handleEdit = (board) => {
        setEditingBoard(board);
        setFormData({
            name: board.name,
            description: board.description,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingBoard(null);
        setFormData({ name: '', description: '' });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    if (loading) {
        return <div className="loading">Loading boards...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Boards</h1>
                    <p className="page-subtitle">Organize your tasks into boards</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    + New Board
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="boards-grid">
                {boards.length === 0 ? (
                    <div className="empty-state">
                        <h3>No boards yet</h3>
                        <p>Create your first board to organize your tasks</p>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            Create Board
                        </button>
                    </div>
                ) : (
                    boards.map((board) => (
                        <BoardCard
                            key={board._id}
                            board={board}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingBoard ? 'Edit Board' : 'Create New Board'}</h2>
                            <button onClick={handleCloseModal} className="close-btn">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="name">Board Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="form-input"
                                    placeholder="Enter board name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="form-input"
                                    rows="4"
                                    placeholder="Enter board description"
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBoard ? 'Update' : 'Create'} Board
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const BoardCard = ({ board, onEdit, onDelete }) => (
    <div className="board-card">
        <div className="board-card-header">
            <h3 className="board-card-title">{board.name}</h3>
            <div className="board-card-actions">
                <button onClick={() => onEdit(board)} className="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
                <button onClick={() => onDelete(board._id)} className="btn-icon" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                </button>
            </div>
        </div>
        <p className="board-card-description">{board.description || 'No description provided'}</p>
        <div className="board-card-footer">
            <span className="board-date">
                Created {new Date(board.createdAt).toLocaleDateString()}
            </span>
        </div>
    </div>
);

export default Boards;
