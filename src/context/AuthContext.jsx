import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDriver, setIsDriver] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (!user) {
                setIsDriver(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const value = { currentUser, loading, isDriver, setIsDriver };
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "var(--secondary-color)",
                    color: "var(--text-color)",
                }}
            >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛺</div>
                <h2 style={{ color: "var(--primary-color)" }}>Auto Savari</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>
                    Loading...
                </p>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

