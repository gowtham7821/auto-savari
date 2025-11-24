import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DriverLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setIsDriver } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // In a real app, we would verify if this user is actually an admin/driver
            // For now, we assume if they successfully login via this portal, they are the driver
            // (The developer manually creates this account)
            setIsDriver(true);
            navigate("/driver-dashboard");
        } catch (err) {
            setError("Failed to login: " + err.message);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Driver Login</h1>
                {error && <p style={{ color: "var(--danger)", textAlign: "center" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Driver Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login to Dashboard</button>
                </form>
            </div>
        </div>
    );
}

