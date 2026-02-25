import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AssignmentSubmit.css';

const AssignmentSubmit = ({ enrolledCourses, addSubmission }) => {
    const [form, setForm] = useState({
        course: '',
        title: '',
        notes: '',
        file: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recentSubmissions, setRecentSubmissions] = useState([]);

    const validate = () => {
        const errs = {};
        if (!form.course) errs.course = 'Please select a course.';
        if (!form.title.trim()) errs.title = 'Assignment title is required.';
        if (form.title.trim().length < 3) errs.title = 'Title must be at least 3 characters.';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setForm((prev) => ({ ...prev, file: file.name }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setLoading(true);
        const now = new Date();
        const submittedAt = now.toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

        const submission = {
            course: form.course,
            title: form.title,
            notes: form.notes,
            file: form.file,
            submittedAt,
        };

        setTimeout(() => {
            addSubmission(submission);
            setRecentSubmissions((prev) => [submission, ...prev]);
            setSuccess(true);
            setLoading(false);
        }, 900);
    };

    const handleAnother = () => {
        setForm({ course: '', title: '', notes: '', file: '' });
        setErrors({});
        setSuccess(false);
    };

    const tips = [
        { icon: '📌', text: 'Upload relevant files that match the assignment scope.' },
        { icon: '✅', text: 'Double-check spelling in the title before submitting.' },
        { icon: '📝', text: 'Add notes to help your instructor understand your approach.' },
        { icon: '🕐', text: 'Submit at least a day before your deadline.' },
    ];

    return (
        <div className="assign-page fade-in">
            <div className="assign-container">

                {/* Header */}
                <div className="assign-header">
                    <div className="assign-badge">📤 Assignment Submission</div>
                    <h1 className="section-title">Submit Your Assignment</h1>
                    <p className="section-subtitle">
                        Select your enrolled course and provide assignment details to submit your work.
                    </p>
                </div>

                {enrolledCourses.length === 0 ? (
                    <div className="assign-no-courses glass-card">
                        <div className="no-enroll-icon">📭</div>
                        <h3 className="no-enroll-title">No Enrolled Courses</h3>
                        <p className="no-enroll-desc">
                            You need to enroll in at least one course before you can submit assignments.
                        </p>
                        <div className="no-enroll-actions">
                            <Link to="/enroll" className="btn btn-primary">🎓 Browse & Enroll</Link>
                            <Link to="/courses" className="btn btn-outline">📚 View Courses</Link>
                        </div>
                    </div>
                ) : (
                    <div className="assign-layout">
                        {/* Form */}
                        <div className="assign-main">
                            {success ? (
                                <div className="assign-success glass-card fade-in">
                                    <div className="as-icon-wrap">
                                        <span className="as-icon">🎊</span>
                                    </div>
                                    <h2 className="as-title">Assignment Submitted!</h2>
                                    <p className="as-msg">
                                        Your assignment <strong>"{form.title}"</strong> for <strong>{form.course}</strong> has been submitted successfully.
                                    </p>
                                    <div className="as-submitted-info">
                                        <div className="as-info-row">
                                            <span>📘 Course</span><span>{form.course}</span>
                                        </div>
                                        <div className="as-info-row">
                                            <span>📝 Assignment</span><span>{form.title}</span>
                                        </div>
                                        {form.file && (
                                            <div className="as-info-row">
                                                <span>📎 File</span><span>{form.file}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="as-actions">
                                        <button className="btn btn-primary" onClick={handleAnother}>📤 Submit Another</button>
                                        <Link to="/student" className="btn btn-outline">🎓 My Dashboard</Link>
                                        <Link to="/admin" className="btn btn-accent">🛡️ Admin View</Link>
                                    </div>
                                </div>
                            ) : (
                                <form className="assign-form glass-card" onSubmit={handleSubmit} noValidate>
                                    <h3 className="assign-form-title">📋 Assignment Details</h3>

                                    {/* Course Select */}
                                    <div className="form-group">
                                        <label htmlFor="course" className="form-label">
                                            Select Course <span className="required">*</span>
                                        </label>
                                        <select
                                            id="course"
                                            name="course"
                                            value={form.course}
                                            onChange={handleChange}
                                            className={`form-input form-select ${errors.course ? 'input-error' : ''}`}
                                        >
                                            <option value="">-- Choose an enrolled course --</option>
                                            {enrolledCourses.map((c) => (
                                                <option key={c.id} value={c.title}>{c.image} {c.title}</option>
                                            ))}
                                        </select>
                                        {errors.course && <span className="error-msg">{errors.course}</span>}
                                    </div>

                                    {/* Assignment Title */}
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">
                                            Assignment Title <span className="required">*</span>
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="e.g. Week 3 — State Management Project"
                                            value={form.title}
                                            onChange={handleChange}
                                            className={`form-input ${errors.title ? 'input-error' : ''}`}
                                        />
                                        {errors.title && <span className="error-msg">{errors.title}</span>}
                                    </div>

                                    {/* File Upload */}
                                    <div className="form-group">
                                        <label className="form-label">Attach File <span className="optional">(optional)</span></label>
                                        <label className="file-upload-area">
                                            <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.zip,.txt,.png,.jpg" hidden />
                                            <div className="file-upload-inner">
                                                {form.file ? (
                                                    <>
                                                        <span className="file-icon">📎</span>
                                                        <span className="file-name">{form.file}</span>
                                                        <span className="file-change">Click to change</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="upload-icon">☁️</span>
                                                        <span className="upload-text">Drag & drop or click to upload</span>
                                                        <span className="upload-sub">PDF, DOC, ZIP, PNG up to 50MB</span>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>

                                    {/* Notes */}
                                    <div className="form-group">
                                        <label htmlFor="notes" className="form-label">
                                            Notes / Comments <span className="optional">(optional)</span>
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={4}
                                            placeholder="Describe your approach, challenges you faced, or any special notes for your instructor..."
                                            value={form.notes}
                                            onChange={handleChange}
                                            className="form-input form-textarea"
                                        />
                                        <span className="char-count">{form.notes.length} / 500</span>
                                    </div>

                                    <button type="submit" className="btn btn-primary assign-submit-btn" disabled={loading}>
                                        {loading ? <span className="btn-spinner" /> : '📤'}
                                        {loading ? 'Submitting...' : 'Submit Assignment'}
                                    </button>
                                </form>
                            )}

                            {/* Recent Submissions */}
                            {recentSubmissions.length > 0 && (
                                <div className="recent-submissions">
                                    <h3 className="recent-title">🕐 Recent Submissions This Session</h3>
                                    {recentSubmissions.map((s, i) => (
                                        <div key={i} className="recent-item glass-card fade-in">
                                            <span className="recent-icon">📝</span>
                                            <div className="recent-info">
                                                <span className="recent-assignment">{s.title}</span>
                                                <span className="recent-course">📘 {s.course}</span>
                                            </div>
                                            <span className="badge badge-green">✅ Done</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="assign-sidebar">
                            {/* Enrolled Courses */}
                            <div className="sidebar-card glass-card">
                                <h4 className="sidebar-title">🎓 Your Enrolled Courses</h4>
                                {enrolledCourses.map((c) => (
                                    <div key={c.id} className="sidebar-course">
                                        <span className="sc-emoji">{c.image || '📘'}</span>
                                        <div className="sc-info">
                                            <span className="sc-name">{c.title}</span>
                                            <span className="sc-instructor">{c.instructor}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tips */}
                            <div className="sidebar-card glass-card">
                                <h4 className="sidebar-title">💡 Submission Tips</h4>
                                <div className="tips-list">
                                    {tips.map((tip, i) => (
                                        <div key={i} className="tip-item">
                                            <span className="tip-icon">{tip.icon}</span>
                                            <span className="tip-text">{tip.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentSubmit;
