import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService, boardService } from '../services/taskService';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalTasks: 0,
        todoTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        totalBoards: 0,
    });
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [tasks, boards] = await Promise.all([
                taskService.getTasks(),
                boardService.getBoards(),
            ]);

            const todoTasks = tasks.filter((t) => t.status === 'todo').length;
            const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
            const completedTasks = tasks.filter((t) => t.status === 'done').length;

            setStats({
                totalTasks: tasks.length,
                todoTasks,
                inProgressTasks,
                completedTasks,
                totalBoards: boards.length,
            });

            setRecentTasks(tasks.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Welcome back, {user?.name}!</h1>
                <p className="page-subtitle">Here's what's happening with your tasks</p>
            </div>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#dbeafe' }}>
                        📋
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Tasks</p>
                        <h3 className="stat-value">{stats.totalTasks}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef3c7' }}>
                        ⏳
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">To Do</p>
                        <h3 className="stat-value">{stats.todoTasks}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#e0e7ff' }}>
                        🔄
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">In Progress</p>
                        <h3 className="stat-value">{stats.inProgressTasks}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#d1fae5' }}>
                        ✅
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Completed</p>
                        <h3 className="stat-value">{stats.completedTasks}</h3>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">Recent Tasks</h2>
                    <Link to="/tasks" className="btn btn-primary">
                        View All
                    </Link>
                </div>

                {recentTasks.length > 0 ? (
                    <div className="task-list">
                        {recentTasks.map((task) => (
                            <div key={task._id} className="task-item">
                                <div className="task-info">
                                    <h3 className="task-title">{task.title}</h3>
                                    <p className="task-description">{task.description}</p>
                                </div>
                                <span className={`task-badge task-badge-${task.status}`}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3 className="empty-state-title">No tasks yet</h3>
                        <p className="empty-state-text">Create your first task to get started</p>
                        <Link to="/tasks" className="btn btn-primary">
                            Create Task
                        </Link>
                    </div>
                )}
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">Boards</h2>
                    <Link to="/boards" className="btn btn-primary">
                        View All
                    </Link>
                </div>
                <p className="section-subtitle">
                    You have {stats.totalBoards} {stats.totalBoards === 1 ? 'board' : 'boards'}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
