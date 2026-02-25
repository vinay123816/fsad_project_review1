import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EnrollCourse.css';

const categoryColor = (cat) => {
    const map = {
        'Web Development': 'var(--gradient-purple)',
        'Programming': 'var(--gradient-blue)',
        'Design': 'var(--gradient-pink)',
        'Data Science': 'var(--gradient-green)',
        'Business': 'var(--gradient-orange)',
        'Marketing': 'var(--gradient-teal)',
    };
    return map[cat] || 'var(--gradient-purple)';
};

const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-green';
    if (level === 'Intermediate') return 'badge badge-blue';
    return 'badge badge-pink';
};

const EnrollCourse = ({ courses, enrollCourse, enrolledCourses }) => {
    const [justEnrolled, setJustEnrolled] = useState(null);
    const [search, setSearch] = useState('');

    const isEnrolled = (id) => enrolledCourses.some((c) => c.id === id);

    const handleEnroll = (course) => {
        enrollCourse(course);
        setJustEnrolled(course.id);
        setTimeout(() => setJustEnrolled(null), 2500);
    };

    const available = courses.filter(
        (c) => !isEnrolled(c.id) && c.title.toLowerCase().includes(search.toLowerCase())
    );
    const enrolled = courses.filter(
        (c) => isEnrolled(c.id) && c.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="enroll-page fade-in">
            <div className="enroll-container">

                {/* Header */}
                <div className="enroll-header">
                    <div className="enroll-badge">🎓 Enrollment Center</div>
                    <h1 className="section-title">Enroll in a Course</h1>
                    <p className="section-subtitle">
                        Choose from {courses.length} available courses. You're enrolled in {enrolledCourses.length} so far.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="enroll-progress-wrap glass-card">
                    <div className="enroll-progress-info">
                        <span className="ep-label">📊 Your Enrollment Progress</span>
                        <span className="ep-count">{enrolledCourses.length} / {courses.length} courses</span>
                    </div>
                    <div className="ep-bar-track">
                        <div
                            className="ep-bar-fill"
                            style={{ width: `${courses.length > 0 ? (enrolledCourses.length / courses.length) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="ep-footer">
                        <span>{courses.length - enrolledCourses.length} remaining</span>
                        <Link to="/student" className="btn btn-outline btn-sm">My Dashboard →</Link>
                    </div>
                </div>

                {/* Search */}
                <div className="enroll-search">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Just enrolled toast */}
                {justEnrolled && (
                    <div className="enroll-toast fade-in">
                        🎉 Successfully enrolled! Head to <Link to="/student">Student Dashboard</Link> to get started.
                    </div>
                )}

                {/* Available Courses */}
                <div className="enroll-section">
                    <h2 className="enroll-section-title">
                        🔍 Available Courses
                        <span className="enroll-count-badge">{available.length}</span>
                    </h2>
                    {available.length === 0 ? (
                        <div className="glass-card empty-state">
                            <span className="empty-icon">🎉</span>
                            <h3>All caught up!</h3>
                            <p>You're enrolled in all available courses.</p>
                        </div>
                    ) : (
                        <div className="enroll-grid">
                            {available.map((course, i) => (
                                <div key={course.id} className="enroll-card glass-card" style={{ animationDelay: `${i * 0.07}s` }}>
                                    <div className="enroll-card-banner" style={{ background: categoryColor(course.category) }}>
                                        <span className="enroll-emoji">{course.image || '📘'}</span>
                                        <div className="enroll-banner-overlay">
                                            <span className="badge badge-purple enroll-cat-badge">{course.category}</span>
                                        </div>
                                    </div>
                                    <div className="enroll-card-body">
                                        <div className="enroll-card-tags">
                                            <span className={levelBadge(course.level)}>{course.level}</span>
                                            <span className="badge badge-blue">⏱ {course.duration}</span>
                                        </div>
                                        <h3 className="enroll-card-title">{course.title}</h3>
                                        <p className="enroll-card-desc">{course.description}</p>

                                        <div className="enroll-card-meta">
                                            <div className="enroll-meta-item">
                                                <span className="meta-icon">👤</span>
                                                <span>{course.instructor}</span>
                                            </div>
                                        </div>

                                        <button
                                            className={`btn enroll-btn ${justEnrolled === course.id ? 'btn-success' : 'btn-primary'}`}
                                            onClick={() => handleEnroll(course)}
                                        >
                                            {justEnrolled === course.id ? '✅ Enrolled!' : '➕ Enroll Now'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Enrolled Courses */}
                {enrolled.length > 0 && (
                    <div className="enroll-section">
                        <h2 className="enroll-section-title">
                            ✅ Already Enrolled
                            <span className="enroll-count-badge enrolled-badge-count">{enrolled.length}</span>
                        </h2>
                        <div className="enrolled-row">
                            {enrolled.map((course, i) => (
                                <div key={course.id} className="enrolled-chip glass-card" style={{ animationDelay: `${i * 0.07}s` }}>
                                    <div className="enrolled-chip-icon" style={{ background: categoryColor(course.category) }}>
                                        {course.image || '📘'}
                                    </div>
                                    <div className="enrolled-chip-info">
                                        <span className="enrolled-chip-title">{course.title}</span>
                                        <span className="enrolled-chip-sub">👤 {course.instructor}</span>
                                    </div>
                                    <div className="enrolled-chip-actions">
                                        <span className="badge badge-green">✅ Enrolled</span>
                                        <Link to="/submit-assignment" className="btn btn-accent btn-sm">📤 Submit</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollCourse;
