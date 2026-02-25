import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { to: '/', label: 'Home', icon: '🏠' },
        { to: '/admin', label: 'Admin', icon: '🛡️' },
        { to: '/student', label: 'Student', icon: '🎓' },
        { to: '/courses', label: 'Courses', icon: '📚' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <NavLink to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                    <span className="brand-icon">🎯</span>
                    <span className="brand-text">
                        EduManage<span className="brand-accent">Pro</span>
                    </span>
                </NavLink>

                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {links.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                            end={to === '/'}
                        >
                            <span className="nav-icon">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/submit-assignment"
                        className={({ isActive }) => `nav-link btn-cta ${isActive ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        ✏️ Submit
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
