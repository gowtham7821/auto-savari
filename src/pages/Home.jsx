import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const buttonStyle = {
        padding: "0.75rem 1.5rem",
        margin: "0.5rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        background: "var(--primary)",
        color: "#fff",
        transition: "background 0.2s",
    };

    return (
        <div className="container">
            <div className="card" style={{ textAlign: "center" }}>
                <h1>Welcome to Auto Savari 🚗</h1>
                <p style={{ marginBottom: "1.5rem", color: "var(--text-muted)" }}>
                    A real-time ride-sharing demo. Choose your role and explore the app.
                </p>

                <div>
                    <button style={buttonStyle} onClick={() => navigate("/login")}>
                        Passenger Login
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/signup")}>
                        Passenger Signup
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/driver-login")}>
                        Driver Login
                    </button>
                </div>
            </div>
        </div>
    );
}
