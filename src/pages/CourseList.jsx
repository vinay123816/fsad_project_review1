import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';

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
        'Business': 'var(--gradient-orange)',
        'Marketing': 'var(--gradient-teal)',
    };
    return map[cat] || 'var(--gradient-purple)';
};

const ALL = 'All';

const CourseList = ({ courses, enrollCourse, enrolledCourses }) => {
    const [search, setSearch] = useState('');
    const [filterLevel, setFilterLevel] = useState(ALL);
    const [filterCat, setFilterCat] = useState(ALL);
    const [view, setView] = useState('grid'); // 'grid' | 'list'

    const isEnrolled = (id) => enrolledCourses.some((c) => c.id === id);

    const categories = [ALL, ...Array.from(new Set(courses.map((c) => c.category).filter(Boolean)))];
    const levels = [ALL, 'Beginner', 'Intermediate', 'Advanced'];

    const filtered = courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());
        const matchLevel = filterLevel === ALL || c.level === filterLevel;
        const matchCat = filterCat === ALL || c.category === filterCat;
        return matchSearch && matchLevel && matchCat;
    });

    return (
        <div className="courselist-page fade-in">
            <div className="courselist-container">

                {/* Header */}
                <div className="cl-header">
                    <div className="cl-header-text">
                        <div className="cl-badge">📚 Course Catalog</div>
                        <h1 className="section-title">All Available Courses</h1>
                        <p className="section-subtitle">
                            Explore our full catalog of {courses.length} courses across {categories.length - 1} categories.
                        </p>
                    </div>
                    <Link to="/create-course" className="btn btn-primary">
                        ➕ New Course
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="cl-toolbar glass-card">
                    <div className="cl-search">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Search courses by title or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="cl-clear" onClick={() => setSearch('')}>✕</button>
                        )}
                    </div>
                    <div className="cl-filters">
                        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="cl-select">
                            {levels.map((l) => <option key={l} value={l}>{l === ALL ? '🎯 All Levels' : l}</option>)}
                        </select>
                        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="cl-select">
                            {categories.map((c) => <option key={c} value={c}>{c === ALL ? '📂 All Categories' : c}</option>)}
                        </select>
                        <div className="view-toggle">
                            <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>⊞</button>
                            <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>☰</button>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="cl-results-info">
                    <span>{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</span>
                    {(search || filterLevel !== ALL || filterCat !== ALL) && (
                        <button className="cl-reset" onClick={() => { setSearch(''); setFilterLevel(ALL); setFilterCat(ALL); }}>
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Course List / Grid */}
                {filtered.length === 0 ? (
                    <div className="glass-card empty-state">
                        <span className="empty-icon">🔎</span>
                        <h3>No courses found</h3>
                        <p>Try changing your search or filters.</p>
                    </div>
                ) : view === 'grid' ? (
                    <div className="cl-grid">
                        {filtered.map((course, i) => (
                            <div key={course.id} className="cl-card glass-card" style={{ animationDelay: `${i * 0.06}s` }}>
                                <div className="cl-card-banner" style={{ background: categoryColor(course.category) }}>
                                    <span className="cl-card-emoji">{course.image || '📘'}</span>
                                    {isEnrolled(course.id) && (
                                        <span className="cl-enrolled-badge">✅ Enrolled</span>
                                    )}
                                </div>
                                <div className="cl-card-body">
                                    <div className="cl-card-tags">
                                        <span className={levelBadge(course.level)}>{course.level}</span>
                                        <span className="badge badge-purple">{course.duration}</span>
                                    </div>
                                    <h3 className="cl-card-title">{course.title}</h3>
                                    <p className="cl-card-desc">{course.description}</p>
                                    <p className="cl-card-instructor">👤 {course.instructor}</p>
                                    <div className="cl-card-footer">
                                        <span className="badge badge-orange">{course.category}</span>
                                        {isEnrolled(course.id) ? (
                                            <Link to="/submit-assignment" className="btn btn-accent btn-sm">📤 Submit</Link>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => enrollCourse(course)}>
                                                ➕ Enroll
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="cl-list">
                        {filtered.map((course, i) => (
                            <div key={course.id} className="cl-list-item glass-card" style={{ animationDelay: `${i * 0.06}s` }}>
                                <div className="cl-list-icon" style={{ background: categoryColor(course.category) }}>
                                    {course.image || '📘'}
                                </div>
                                <div className="cl-list-body">
                                    <div className="cl-list-top">
                                        <h3 className="cl-list-title">{course.title}</h3>
                                        <div className="cl-list-tags">
                                            <span className={levelBadge(course.level)}>{course.level}</span>
                                            <span className="badge badge-purple">{course.duration}</span>
                                            <span className="badge badge-orange">{course.category}</span>
                                        </div>
                                    </div>
                                    <p className="cl-list-desc">{course.description}</p>
                                    <p className="cl-list-instructor">👤 {course.instructor}</p>
                                </div>
                                <div className="cl-list-action">
                                    {isEnrolled(course.id) ? (
                                        <span className="badge badge-green">✅ Enrolled</span>
                                    ) : (
                                        <button className="btn btn-primary btn-sm" onClick={() => enrollCourse(course)}>
                                            ➕ Enroll
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseList;
