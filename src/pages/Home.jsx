import { Link } from 'react-router-dom';
import './Home.css';

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

const stats = [
    { icon: '📚', value: '50+', label: 'Courses Available' },
    { icon: '👩‍🎓', value: '2.4k', label: 'Active Students' },
    { icon: '🏆', value: '98%', label: 'Completion Rate' },
    { icon: '⭐', value: '4.9', label: 'Average Rating' },
];

const features = [
    {
        icon: '🛡️',
        title: 'Admin Controls',
        desc: 'Create and manage courses, track enrollments, and monitor student progress in real-time.',
        gradient: 'var(--gradient-purple)',
        link: '/admin',
        cta: 'Go to Admin',
    },
    {
        icon: '🎓',
        title: 'Student Hub',
        desc: 'Enroll in courses, submit assignments, and track your learning journey effortlessly.',
        gradient: 'var(--gradient-blue)',
        link: '/student',
        cta: 'Go to Student',
    },
    {
        icon: '✏️',
        title: 'Assignments',
        desc: 'Submit assignments for enrolled courses and keep your progress up to date.',
        gradient: 'var(--gradient-green)',
        link: '/submit-assignment',
        cta: 'Submit Now',
    },
];

const Home = ({ courses }) => {
    const preview = courses.slice(0, 3);

    return (
        <div className="home-page fade-in">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-blob hero-blob-1" />
                <div className="hero-blob hero-blob-2" />
                <div className="hero-blob hero-blob-3" />
                <div className="hero-content">
                    <div className="hero-tag">
                        <span>🚀</span> The Future of Online Education
                    </div>
                    <h1 className="hero-title">
                        Empower Learning,<br />
                        <span className="hero-title-gradient">Elevate Educators</span>
                    </h1>
                    <p className="hero-subtitle">
                        A powerful platform for educators to create, manage, and deliver courses —
                        and for students to learn, grow, and achieve their goals.
                    </p>
                    <div className="hero-actions">
                        <Link to="/admin" className="btn btn-primary hero-btn">
                            🛡️ Admin Dashboard
                        </Link>
                        <Link to="/student" className="btn btn-accent hero-btn">
                            🎓 Student Portal
                        </Link>
                    </div>
                </div>

                {/* Floating course cards */}
                <div className="hero-visual">
                    {preview.map((course, i) => (
                        <div
                            key={course.id}
                            className="floating-card"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            <div className="floating-card-icon" style={{ background: categoryColor(course.category) }}>
                                {course.image}
                            </div>
                            <div className="floating-card-info">
                                <span className="floating-card-title">{course.title}</span>
                                <span className="floating-card-meta">{course.instructor}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-card glass-card">
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Everything You Need</h2>
                        <p className="section-subtitle">
                            A complete ecosystem for modern online education management.
                        </p>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card glass-card" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="feature-icon-wrap" style={{ background: f.gradient }}>
                                    <span className="feature-icon">{f.icon}</span>
                                </div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                                <Link to={f.link} className="btn btn-outline btn-sm feature-cta">
                                    {f.cta} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Preview */}
            <section className="preview-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Courses</h2>
                        <p className="section-subtitle">
                            Hand-picked courses to jumpstart your learning journey.
                        </p>
                    </div>
                    <div className="preview-grid">
                        {preview.map((course, i) => (
                            <div key={course.id} className="preview-card glass-card" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="preview-banner" style={{ background: categoryColor(course.category) }}>
                                    <span className="preview-emoji">{course.image}</span>
                                </div>
                                <div className="preview-body">
                                    <div className="preview-tags">
                                        <span className={levelBadge(course.level)}>{course.level}</span>
                                        <span className="badge badge-purple">{course.duration}</span>
                                    </div>
                                    <h3 className="preview-title">{course.title}</h3>
                                    <p className="preview-desc">{course.description}</p>
                                    <div className="preview-footer">
                                        <span className="preview-instructor">👤 {course.instructor}</span>
                                        <Link to="/enroll" className="btn btn-primary btn-sm">Enroll →</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="preview-more">
                        <Link to="/courses" className="btn btn-outline">
                            📚 Browse All Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-banner glass-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Start Teaching?</h2>
                            <p className="cta-sub">Create your first course in minutes and reach hundreds of eager learners.</p>
                            <Link to="/create-course" className="btn btn-primary cta-btn">
                                ➕ Create a Course
                            </Link>
                        </div>
                        <div className="cta-emoji">🚀</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
