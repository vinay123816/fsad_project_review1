import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCourse.css';

const categories = ['Web Development', 'Programming', 'Design', 'Data Science', 'Business', 'Marketing', 'Other'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const durations = ['1 Week', '2 Weeks', '3 Weeks', '4 Weeks', '5 Weeks', '6 Weeks', '8 Weeks', '10 Weeks', '12 Weeks'];
const emojis = ['📘', '⚛️', '🟨', '🎨', '🐍', '🚀', '💡', '🔥', '🌐', '🤖', '📊', '🛠️'];

const CreateCourse = ({ addCourse }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        instructor: '',
        category: '',
        level: '',
        duration: '',
        image: '📘',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Course title is required.';
        if (!form.description.trim()) errs.description = 'Description is required.';
        if (form.description.trim().length < 20) errs.description = 'Description must be at least 20 characters.';
        if (!form.instructor.trim()) errs.instructor = 'Instructor name is required.';
        if (!form.category) errs.category = 'Please select a category.';
        if (!form.level) errs.level = 'Please select a level.';
        if (!form.duration) errs.duration = 'Please select a duration.';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        setTimeout(() => {
            addCourse(form);
            setSuccess(true);
            setLoading(false);
        }, 800);
    };

    const handleReset = () => {
        setForm({ title: '', description: '', instructor: '', category: '', level: '', duration: '', image: '📘' });
        setErrors({});
        setSuccess(false);
    };

    if (success) {
        return (
            <div className="create-page fade-in">
                <div className="create-container">
                    <div className="success-card glass-card">
                        <div className="success-icon-wrap">
                            <span className="success-icon">🎉</span>
                        </div>
                        <h2 className="success-title">Course Created!</h2>
                        <p className="success-msg">
                            <strong>"{form.title}"</strong> has been successfully added to the course catalog.
                            Students can now discover and enroll in it.
                        </p>
                        <div className="success-actions">
                            <button className="btn btn-primary" onClick={handleReset}>➕ Create Another</button>
                            <button className="btn btn-outline" onClick={() => navigate('/admin')}>🛡️ Go to Admin</button>
                            <button className="btn btn-accent" onClick={() => navigate('/courses')}>📚 View Courses</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="create-page fade-in">
            <div className="create-container">

                {/* Header */}
                <div className="create-header">
                    <div className="create-badge">✏️ Course Builder</div>
                    <h1 className="section-title">Create a New Course</h1>
                    <p className="section-subtitle">
                        Fill in the details below to publish a new course for students to discover and enroll in.
                    </p>
                </div>

                <div className="create-layout">
                    {/* Form */}
                    <form className="create-form glass-card" onSubmit={handleSubmit} noValidate>

                        {/* Emoji Picker */}
                        <div className="form-group">
                            <label className="form-label">Course Icon</label>
                            <div className="emoji-grid">
                                {emojis.map((e) => (
                                    <button
                                        key={e}
                                        type="button"
                                        className={`emoji-btn ${form.image === e ? 'selected' : ''}`}
                                        onClick={() => setForm((prev) => ({ ...prev, image: e }))}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Course Title <span className="required">*</span></label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g. Introduction to Machine Learning"
                                value={form.title}
                                onChange={handleChange}
                                className={`form-input ${errors.title ? 'input-error' : ''}`}
                            />
                            {errors.title && <span className="error-msg">{errors.title}</span>}
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Description <span className="required">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Describe what students will learn in this course..."
                                value={form.description}
                                onChange={handleChange}
                                className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
                            />
                            <div className="input-footer">
                                {errors.description && <span className="error-msg">{errors.description}</span>}
                                <span className="char-count">{form.description.length} chars</span>
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="form-group">
                            <label htmlFor="instructor" className="form-label">Instructor Name <span className="required">*</span></label>
                            <input
                                id="instructor"
                                name="instructor"
                                type="text"
                                placeholder="e.g. Dr. Jane Smith"
                                value={form.instructor}
                                onChange={handleChange}
                                className={`form-input ${errors.instructor ? 'input-error' : ''}`}
                            />
                            {errors.instructor && <span className="error-msg">{errors.instructor}</span>}
                        </div>

                        {/* Row: Category + Level */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">Category <span className="required">*</span></label>
                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className={`form-input form-select ${errors.category ? 'input-error' : ''}`}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.category && <span className="error-msg">{errors.category}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="level" className="form-label">Level <span className="required">*</span></label>
                                <select
                                    id="level"
                                    name="level"
                                    value={form.level}
                                    onChange={handleChange}
                                    className={`form-input form-select ${errors.level ? 'input-error' : ''}`}
                                >
                                    <option value="">Select level</option>
                                    {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                                </select>
                                {errors.level && <span className="error-msg">{errors.level}</span>}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="form-group">
                            <label htmlFor="duration" className="form-label">Duration <span className="required">*</span></label>
                            <div className="duration-grid">
                                {durations.map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        className={`duration-btn ${form.duration === d ? 'selected' : ''}`}
                                        onClick={() => { setForm((prev) => ({ ...prev, duration: d })); if (errors.duration) setErrors((p) => ({ ...p, duration: '' })); }}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                            {errors.duration && <span className="error-msg">{errors.duration}</span>}
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="btn btn-outline" onClick={handleReset}>🔄 Reset</button>
                            <button type="submit" className="btn btn-primary create-submit-btn" disabled={loading}>
                                {loading ? <span className="btn-spinner" /> : '🚀'}
                                {loading ? 'Creating...' : 'Create Course'}
                            </button>
                        </div>
                    </form>

                    {/* Preview */}
                    <div className="create-preview">
                        <h3 className="preview-heading">Live Preview</h3>
                        <div className="preview-card-wrapper glass-card">
                            <div className="prev-banner" style={{
                                background: form.category === 'Design' ? 'var(--gradient-pink)'
                                    : form.category === 'Data Science' ? 'var(--gradient-green)'
                                        : form.category === 'Programming' ? 'var(--gradient-blue)'
                                            : 'var(--gradient-purple)'
                            }}>
                                <span className="prev-emoji">{form.image}</span>
                            </div>
                            <div className="prev-body">
                                <div className="prev-tags">
                                    {form.level && <span className={`badge ${form.level === 'Beginner' ? 'badge-green' : form.level === 'Intermediate' ? 'badge-blue' : 'badge-pink'}`}>{form.level}</span>}
                                    {form.duration && <span className="badge badge-purple">{form.duration}</span>}
                                    {form.category && <span className="badge badge-orange">{form.category}</span>}
                                </div>
                                <h4 className="prev-title">{form.title || 'Your Course Title'}</h4>
                                <p className="prev-desc">{form.description || 'Your course description will appear here...'}</p>
                                {form.instructor && <p className="prev-instructor">👤 {form.instructor}</p>}
                            </div>
                        </div>
                        <p className="preview-note">This is how students will see your course.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
