import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import './Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingTask) {
                await taskService.updateTask(editingTask._id, formData);
            } else {
                await taskService.createTask(formData);
            }

            await fetchTasks();
            setShowModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await taskService.deleteTask(id);
            await fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingTask(null);
        setFormData({ title: '', description: '', status: 'todo' });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const getTasksByStatus = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Tasks</h1>
                    <p className="page-subtitle">Manage your tasks efficiently</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    + New Task
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="tasks-board">
                <div className="task-column">
                    <div className="column-header">
                        <h3>To Do</h3>
                        <span className="task-count">{getTasksByStatus('todo').length}</span>
                    </div>
                    <div className="task-cards">
                        {getTasksByStatus('todo').map((task) => (
                            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>

                <div className="task-column">
                    <div className="column-header">
                        <h3>In Progress</h3>
                        <span className="task-count">{getTasksByStatus('in-progress').length}</span>
                    </div>
                    <div className="task-cards">
                        {getTasksByStatus('in-progress').map((task) => (
                            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>

                <div className="task-column">
                    <div className="column-header">
                        <h3>Done</h3>
                        <span className="task-count">{getTasksByStatus('done').length}</span>
                    </div>
                    <div className="task-cards">
                        {getTasksByStatus('done').map((task) => (
                            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                            <button onClick={handleCloseModal} className="close-btn">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="form-input"
                                    placeholder="Enter task title"
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
                                    placeholder="Enter task description"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="form-input"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingTask ? 'Update' : 'Create'} Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const TaskCard = ({ task, onEdit, onDelete }) => (
    <div className="task-card">
        <h4 className="task-card-title">{task.title}</h4>
        <p className="task-card-description">{task.description}</p>
        <div className="task-card-actions">
            <button onClick={() => onEdit(task)} className="btn-icon" title="Edit">
                ✏️
            </button>
            <button onClick={() => onDelete(task._id)} className="btn-icon" title="Delete">
                🗑️
            </button>
        </div>
    </div>
);

export default Tasks;
