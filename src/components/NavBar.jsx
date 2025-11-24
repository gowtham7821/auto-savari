import { NavLink } from "react-router-dom";

export default function NavBar() {
    const linkStyle = {
        color: "var(--primary-color)", // Use the CSS variable
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: 600,
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        transition: "var(--transition)"
    };

    const getStyle = ({ isActive }) => ({
        ...linkStyle,
        background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
        color: isActive ? "var(--primary-color)" : "var(--text-muted)"
    });

    return (
        <nav style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            marginBottom: "20px",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
            <NavLink to="/home" style={getStyle}>Home</NavLink>
            <NavLink to="/about" style={getStyle}>About</NavLink>
            <NavLink to="/driver-dashboard" style={getStyle}>Driver Dashboard</NavLink>
        </nav>
    );
}
