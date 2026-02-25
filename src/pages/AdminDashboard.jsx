import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-green';
    if (level === 'Intermediate') return 'badge badge-blue';
    return 'badge badge-pink';
};

const AdminDashboard = ({ courses, deleteCourse, enrolledCourses, submissions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);

    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEnrollCount = (courseId) =>
        enrolledCourses.filter((c) => c.id === courseId).length;

    const totalEnrollments = enrolledCourses.length;
    const totalSubmissions = submissions.length;

    const handleDelete = (id) => {
        deleteCourse(id);
        setConfirmDelete(null);
    };

    const summaryCards = [
        { icon: '📚', label: 'Total Courses', value: courses.length, gradient: 'var(--gradient-purple)', sub: '+' + Math.max(0, courses.length - 4) + ' new' },
        { icon: '👥', label: 'Enrolled Students', value: totalEnrollments, gradient: 'var(--gradient-blue)', sub: 'across all courses' },
        { icon: '📝', label: 'Submissions', value: totalSubmissions, gradient: 'var(--gradient-green)', sub: 'assignments received' },
        { icon: '📊', label: 'Avg. Enrollment', value: courses.length ? Math.round((totalEnrollments / courses.length) * 10) / 10 : 0, gradient: 'var(--gradient-orange)', sub: 'per course' },
    ];

    return (
        <div className="admin-page fade-in">
            <div className="admin-container">
                {/* Header */}
                <div className="admin-header">
                    <div className="admin-header-text">
                        <div className="admin-badge">🛡️ Admin Panel</div>
                        <h1 className="section-title">Educator Dashboard</h1>
                        <p className="section-subtitle">
                            Manage your courses, monitor student activity, and track performance.
                        </p>
                    </div>
                    <Link to="/create-course" className="btn btn-primary admin-create-btn">
                        ➕ Create New Course
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="admin-summary-grid">
                    {summaryCards.map((card, i) => (
                        <div key={i} className="summary-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="summary-icon" style={{ background: card.gradient }}>
                                {card.icon}
                            </div>
                            <div className="summary-info">
                                <div className="summary-value">{card.value}</div>
                                <div className="summary-label">{card.label}</div>
                                <div className="summary-sub">{card.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Courses Management */}
                <div className="admin-section">
                    <div className="section-toolbar">
                        <h2 className="admin-section-title">📋 Course Management</h2>
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="glass-card empty-state">
                            <span className="empty-icon">📭</span>
                            <h3>No courses found</h3>
                            <p>Try a different search or create a new course.</p>
                        </div>
                    ) : (
                        <div className="admin-course-grid">
                            {filtered.map((course, i) => (
                                <div key={course.id} className="admin-course-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
                                    <div className="admin-card-header">
                                        <span className="admin-course-emoji">{course.image || '📘'}</span>
                                        <div className="admin-card-badges">
                                            <span className={levelBadge(course.level)}>{course.level}</span>
                                            <span className="badge badge-purple">{course.category || 'General'}</span>
                                        </div>
                                    </div>
                                    <h3 className="admin-course-title">{course.title}</h3>
                                    <p className="admin-course-desc">{course.description}</p>

                                    <div className="admin-course-meta">
                                        <span>👤 {course.instructor || 'N/A'}</span>
                                        <span>⏱ {course.duration || 'N/A'}</span>
                                    </div>

                                    <div className="admin-enroll-bar">
                                        <span className="enroll-count">
                                            👥 {getEnrollCount(course.id)} enrolled
                                        </span>
                                        {getEnrollCount(course.id) > 0 && (
                                            <span className="badge badge-green">Active</span>
                                        )}
                                    </div>

                                    <div className="admin-card-actions">
                                        {confirmDelete === course.id ? (
                                            <div className="confirm-delete">
                                                <span className="confirm-text">Are you sure?</span>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>
                                                    Yes, Delete
                                                </button>
                                                <button className="btn btn-outline btn-sm" onClick={() => setConfirmDelete(null)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => setConfirmDelete(course.id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Enrollment Overview */}
                <div className="admin-section">
                    <h2 className="admin-section-title">👥 Enrollment Overview</h2>
                    {enrolledCourses.length === 0 ? (
                        <div className="glass-card empty-state">
                            <span className="empty-icon">📉</span>
                            <h3>No enrollments yet</h3>
                            <p>Students haven't enrolled in any course yet.</p>
                        </div>
                    ) : (
                        <div className="enrollment-table glass-card">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Course</th>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Instructor</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledCourses.map((course, i) => (
                                        <tr key={course.id + '-' + i}>
                                            <td className="td-num">{i + 1}</td>
                                            <td className="td-course">
                                                <span className="td-emoji">{course.image || '📘'}</span>
                                                {course.title}
                                            </td>
                                            <td><span className="badge badge-purple">{course.category || 'General'}</span></td>
                                            <td><span className={levelBadge(course.level)}>{course.level || 'N/A'}</span></td>
                                            <td className="td-instructor">{course.instructor || 'N/A'}</td>
                                            <td><span className="badge badge-green">Enrolled</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Submissions Overview */}
                <div className="admin-section">
                    <h2 className="admin-section-title">📝 Assignment Submissions</h2>
                    {submissions.length === 0 ? (
                        <div className="glass-card empty-state">
                            <span className="empty-icon">📄</span>
                            <h3>No submissions yet</h3>
                            <p>Student submissions will appear here.</p>
                        </div>
                    ) : (
                        <div className="enrollment-table glass-card">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Course</th>
                                        <th>Assignment</th>
                                        <th>Notes</th>
                                        <th>Submitted At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((s, i) => (
                                        <tr key={i}>
                                            <td className="td-num">{i + 1}</td>
                                            <td className="td-course">📘 {s.course}</td>
                                            <td>{s.title}</td>
                                            <td className="td-notes">{s.notes || '—'}</td>
                                            <td className="td-date">{s.submittedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
