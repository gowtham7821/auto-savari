import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DriverDashboard() {
    const [status, setStatus] = useState("unavailable");
    const [loading, setLoading] = useState(true);
    const [isDriver, setIsDriver] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Default user email
    const defaultEmail = "gowthamv7821@gmail.com";
    const isDefaultUser = currentUser?.email === defaultEmail;

    // Hardcoded driver details
    const driverDetails = {
        name: "Ravi",
        autoNumber: "TN01-1234",
        phone: "9876543210" // Default placeholder number
    };

    useEffect(() => {
        const checkUserRole = async () => {
            if (!currentUser) return;

            if (isDefaultUser) {
                setIsDriver(false);
                return;
            }

            // Check if user exists in 'users' collection (Passenger)
            const userDocRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                // It's a passenger
                setIsDriver(false);
            } else {
                // Not in 'users' collection -> Assume Driver (Admin)
                setIsDriver(true);
            }
        };

        checkUserRole();
    }, [currentUser, isDefaultUser]);

    useEffect(() => {
        const driverDocRef = doc(db, "drivers", "adminDriver");

        const unsubscribe = onSnapshot(driverDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setStatus(docSnap.data().status);
            } else {
                setDoc(driverDocRef, {
                    ...driverDetails,
                    status: "unavailable",
                    lastUpdated: serverTimestamp()
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleStatus = async () => {
        if (!isDriver) {
            alert("Only the Driver can change availability status.");
            return;
        }
        const newStatus = status === "available" ? "unavailable" : "available";
        try {
            await updateDoc(doc(db, "drivers", "adminDriver"), {
                status: newStatus,
                lastUpdated: serverTimestamp()
            });
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/driver-login");
    };

    const switchToAdmin = async () => {
        await signOut(auth);
        navigate("/driver-login");
    };

    if (loading) return <div className="container"><div className="card">Loading...</div></div>;

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h1>Driver Dashboard</h1>
                    <div
                        onClick={isDefaultUser ? switchToAdmin : handleLogout}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "var(--text-muted)",
                            opacity: 0.3,
                            cursor: "pointer"
                        }}
                        title={isDefaultUser ? "Admin Login" : "Logout"}
                    ></div>
                </div>

                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <div style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "#ccc",
                        margin: "0 auto 15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem"
                    }}>
                        🛺
                    </div>
                    <h2>{driverDetails.name}</h2>
                    <p style={{ color: "var(--text-muted)" }}>{driverDetails.autoNumber}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "16px" }}>
                    <div>
                        <h3>Availability</h3>
                        <p style={{ color: status === "available" ? "var(--success)" : "var(--danger)", fontWeight: "bold" }}>
                            {status === "available" ? "ONLINE" : "OFFLINE"}
                        </p>
                    </div>

                    <label className="toggle-switch" style={{ opacity: isDriver ? 1 : 0.5 }}>
                        <input
                            type="checkbox"
                            checked={status === "available"}
                            onChange={toggleStatus}
                            disabled={!isDriver}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                {!isDriver && (
                    <p style={{ textAlign: "center", marginTop: "10px", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        {isDefaultUser ? "View Mode Only. Login as Admin to control availability." : "Passenger View Only."}
                    </p>
                )}

                <div style={{ marginTop: "30px" }}>
                    <h3>My Details</h3>
                    <p><strong>Phone:</strong> {driverDetails.phone}</p>
                    <p><strong>Auto Number:</strong> {driverDetails.autoNumber}</p>
                </div>
            </div>
        </div>
    );
}
