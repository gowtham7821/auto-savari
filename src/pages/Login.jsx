import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            setError("Failed to login: " + err.message);
        }
    };

    if (!showForm) {
        return (
            <div className="container">
                <div className="card" style={{ textAlign: "center", padding: "40px 20px", position: "relative" }}>
                    <button
                        onClick={() => navigate("/home")}
                        style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            background: "none",
                            fontSize: "1.5rem",
                            color: "var(--text-muted)",
                            padding: "5px",
                            lineHeight: "1"
                        }}
                    >
                        ✕
                    </button>

                    <h1 style={{ marginBottom: "20px" }}>Welcome to Auto Savari</h1>

                    <div style={{ fontSize: "3rem", marginBottom: "20px" }}>
                        🛺
                    </div>

                    <p style={{ color: "var(--text-muted)", marginBottom: "40px", lineHeight: "1.5" }}>
                        A real-time ride-sharing demo. Choose your role and explore the app.
                    </p>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                            style={{ flex: 1 }}
                        >
                            Passenger Login
                        </button>

                        <Link to="/signup" style={{ flex: 1, textDecoration: "none" }}>
                            <button className="btn btn-outline" style={{ width: "100%" }}>
                                Passenger Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <button
                        onClick={() => setShowForm(false)}
                        style={{ background: "none", fontSize: "1.2rem", marginRight: "10px", color: "var(--text-muted)" }}
                    >
                        ←
                    </button>
                    <h1>Passenger Login</h1>
                </div>

                {error && <p style={{ color: "var(--danger)", textAlign: "center", marginBottom: "15px" }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", color: "var(--text-muted)" }}>
                    Need an account? <Link to="/signup" style={{ color: "var(--primary-color)" }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
