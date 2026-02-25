import { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-green';
    if (level === 'Intermediate') return 'badge badge-blue';
    return 'badge badge-pink';
};

const categoryColor = (cat) => {
    const map = {
        'Web Development': 'var(--gradient-purple)',
        'Programming': 'var(--gradient-blue)',
        'Design': 'var(--gradient-pink)',
        'Data Science': 'var(--gradient-green)',
    };
    return map[cat] || 'var(--gradient-purple)';
};

const StudentDashboard = ({ courses, enrolledCourses, enrollCourse, unenrollCourse, submissions }) => {
    const [activeTab, setActiveTab] = useState('available');
    const [searchTerm, setSearchTerm] = useState('');

    const isEnrolled = (id) => enrolledCourses.some((c) => c.id === id);

    const availableCourses = courses.filter(
        (c) => !isEnrolled(c.id) && c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const myCourses = enrolledCourses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const mySubmissions = submissions.filter((s) =>
        s.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tabs = [
        { key: 'available', label: '🔍 Browse Courses', count: courses.filter(c => !isEnrolled(c.id)).length },
        { key: 'enrolled', label: '🎓 My Courses', count: enrolledCourses.length },
        { key: 'submissions', label: '📝 My Submissions', count: submissions.length },
    ];

    return (
        <div className="student-page fade-in">
            <div className="student-container">

                {/* Header */}
                <div className="student-header">
                    <div className="student-header-text">
                        <div className="student-badge">🎓 Student Portal</div>
                        <h1 className="section-title">My Learning Hub</h1>
                        <p className="section-subtitle">
                            Explore courses, manage your enrollments, and submit assignments — all in one place.
                        </p>
                    </div>
                    <Link to="/submit-assignment" className="btn btn-success student-submit-btn">
                        ✏️ Submit Assignment
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="student-stats">
                    {[
                        { icon: '📚', val: courses.length, label: 'Available Courses' },
                        { icon: '🎯', val: enrolledCourses.length, label: 'Enrolled' },
                        { icon: '📝', val: submissions.length, label: 'Submitted' },
                        { icon: '✅', val: enrolledCourses.length > 0 ? '🟢' : '⚪', label: 'Status' },
                    ].map((s, i) => (
                        <div key={i} className="student-stat glass-card">
                            <span className="s-stat-icon">{s.icon}</span>
                            <span className="s-stat-val">{s.val}</span>
                            <span className="s-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="student-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`student-tab ${activeTab === tab.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                            <span className="tab-count">{tab.count}</span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="student-search">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'available' ? 'courses' : activeTab === 'enrolled' ? 'my courses' : 'submissions'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tab Content */}
                {activeTab === 'available' && (
                    <div className="tab-panel fade-in">
                        {availableCourses.length === 0 ? (
                            <div className="glass-card empty-state">
                                <span className="empty-icon">🎉</span>
                                <h3>{courses.length === enrolledCourses.length ? "You're enrolled in everything!" : 'No courses found'}</h3>
                                <p>Try adjusting your search term.</p>
                            </div>
                        ) : (
                            <div className="course-grid">
                                {availableCourses.map((course, i) => (
                                    <div key={course.id} className="s-course-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
                                        <div className="s-course-banner" style={{ background: categoryColor(course.category) }}>
                                            <span className="s-course-emoji">{course.image || '📘'}</span>
                                        </div>
                                        <div className="s-course-body">
                                            <div className="s-course-tags">
                                                <span className={levelBadge(course.level)}>{course.level}</span>
                                                <span className="badge badge-purple">{course.duration}</span>
                                            </div>
                                            <h3 className="s-course-title">{course.title}</h3>
                                            <p className="s-course-desc">{course.description}</p>
                                            <p className="s-course-instructor">👤 {course.instructor}</p>
                                            <button
                                                className="btn btn-primary s-enroll-btn"
                                                onClick={() => enrollCourse(course)}
                                            >
                                                ➕ Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'enrolled' && (
                    <div className="tab-panel fade-in">
                        {myCourses.length === 0 ? (
                            <div className="glass-card empty-state">
                                <span className="empty-icon">📖</span>
                                <h3>No enrolled courses yet</h3>
                                <p>Browse available courses and enroll to start learning.</p>
                            </div>
                        ) : (
                            <div className="course-grid">
                                {myCourses.map((course, i) => (
                                    <div key={course.id} className="s-course-card glass-card enrolled" style={{ animationDelay: `${i * 0.08}s` }}>
                                        <div className="s-course-banner" style={{ background: categoryColor(course.category) }}>
                                            <span className="s-course-emoji">{course.image || '📘'}</span>
                                            <span className="enrolled-ribbon">✅ Enrolled</span>
                                        </div>
                                        <div className="s-course-body">
                                            <div className="s-course-tags">
                                                <span className={levelBadge(course.level)}>{course.level}</span>
                                                <span className="badge badge-green">Active</span>
                                            </div>
                                            <h3 className="s-course-title">{course.title}</h3>
                                            <p className="s-course-desc">{course.description}</p>
                                            <p className="s-course-instructor">👤 {course.instructor}</p>
                                            <div className="enrolled-actions">
                                                <Link to="/submit-assignment" className="btn btn-accent btn-sm">
                                                    📤 Submit Assignment
                                                </Link>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => unenrollCourse(course.id)}
                                                >
                                                    ❌ Unenroll
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'submissions' && (
                    <div className="tab-panel fade-in">
                        {mySubmissions.length === 0 ? (
                            <div className="glass-card empty-state">
                                <span className="empty-icon">📄</span>
                                <h3>No submissions yet</h3>
                                <p>Submit your first assignment from an enrolled course.</p>
                            </div>
                        ) : (
                            <div className="submissions-list">
                                {mySubmissions.map((s, i) => (
                                    <div key={i} className="submission-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
                                        <div className="sub-left">
                                            <div className="sub-icon">📝</div>
                                            <div className="sub-info">
                                                <h4 className="sub-title">{s.title}</h4>
                                                <p className="sub-course">📘 {s.course}</p>
                                                {s.notes && <p className="sub-notes">{s.notes}</p>}
                                            </div>
                                        </div>
                                        <div className="sub-right">
                                            <span className="badge badge-green">Submitted</span>
                                            <span className="sub-date">{s.submittedAt}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
