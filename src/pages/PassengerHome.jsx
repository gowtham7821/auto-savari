import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PassengerHome() {
    const [driverData, setDriverData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Default user email
    const defaultEmail = "gowthamv7821@gmail.com";
    const isDefaultUser = currentUser?.email === defaultEmail;

    useEffect(() => {
        const driverDocRef = doc(db, "drivers", "adminDriver");

        const unsubscribe = onSnapshot(driverDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setDriverData(docSnap.data());
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleSwitchAccount = async () => {
        await signOut(auth);
        navigate("/login");
    };

    if (loading) return <div className="container"><div className="card">Loading...</div></div>;

    if (!driverData) return (
        <div className="container">
            <div className="card">
                <h1>Auto Savari</h1>
                <p>Driver system not initialized.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );

    const isAvailable = driverData.status === "available";

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h1>Auto Savari</h1>
                    {isDefaultUser ? (
                        <button
                            onClick={handleSwitchAccount}
                            style={{ width: "auto", padding: "8px 16px", fontSize: "0.9rem", background: "var(--primary-color)", color: "#000" }}
                        >
                            Login / Sign Up
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            style={{ width: "auto", padding: "8px 16px", fontSize: "0.9rem", background: "var(--bg-card)", border: "1px solid var(--text-muted)" }}
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: `4px solid ${isAvailable ? "var(--success)" : "var(--danger)"}`,
                        margin: "0 auto 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        background: "rgba(255,255,255,0.1)"
                    }}>
                        🛺
                    </div>

                    <h2 style={{ color: isAvailable ? "var(--success)" : "var(--danger)", fontSize: "1.5rem", marginBottom: "10px" }}>
                        {isAvailable ? "Auto is Available" : "Auto is Unavailable"}
                    </h2>

                    <h3>{driverData.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>{driverData.autoNumber}</p>
                </div>

                <div style={{ display: "grid", gap: "15px" }}>
                    <a href={`tel:${driverData.phone}`} style={{ textDecoration: "none" }}>
                        <button style={{ background: "var(--success)" }}>
                            📞 Call Now
                        </button>
                    </a>

                    <a href={`tel:${driverData.phone}`} style={{ textDecoration: "none" }}>
                        <button style={{ background: "var(--primary)" }}>
                            📅 Call for Future Savari
                        </button>
                    </a>
                </div>

                {isDefaultUser && (
                    <div style={{ marginTop: "20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        <p>You are viewing as Guest. Login to create your own account.</p>
                    </div>
                )}

                <div style={{ marginTop: "20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <p>Future rides are booked via phone call only.</p>
                </div>
            </div>
        </div>
    );
}

