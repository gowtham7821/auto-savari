import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export default function About() {
    const [showForm, setShowForm] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        setLoading(true);

        try {
            console.log("Attempting to save to Firestore 'feedback' collection...");

            await addDoc(collection(db, "feedback"), {
                text: feedback,
                createdAt: serverTimestamp(),
                device: navigator.userAgent,
                userEmail: auth.currentUser ? auth.currentUser.email : "Guest"
            });

            console.log("Successfully saved to 'feedback' collection in Firestore!");
            setSubmitted(true);
            setFeedback("");

            setTimeout(() => {
                setShowForm(false);
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error("Error sending feedback:", error);
            if (error.code === 'permission-denied') {
                alert("Error: Permission denied. Please check your Firestore Security Rules or login.");
            } else {
                alert("Failed to send feedback: " + error.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <div className="card">
                <h1>About Auto Savari</h1>

                <div style={{ marginTop: "1.5rem" }}>
                    <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
                        Auto Savari is an exclusive application designed to connect you directly with <strong>Driver Velu P</strong>.
                    </p>
                </div>

                <div style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "12px" }}>
                    <h3 style={{ color: "var(--primary-color)", marginBottom: "10px" }}>Why use this app?</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "10px", display: "flex", alignItems: "start" }}>
                            <span style={{ marginRight: "10px" }}>⚡</span>
                            <span><strong>Save Time:</strong> No need to wait outside searching for an auto.</span>
                        </li>
                        <li style={{ marginBottom: "10px", display: "flex", alignItems: "start" }}>
                            <span style={{ marginRight: "10px" }}>📞</span>
                            <span><strong>Direct Booking:</strong> Check availability and call Velu P directly.</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "start" }}>
                            <span style={{ marginRight: "10px" }}>🛡️</span>
                            <span><strong>Trusted Service:</strong> A dedicated service for your daily commute.</span>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <p style={{ marginBottom: "10px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        Tap below to give feedback
                    </p>

                    <div
                        onClick={() => setShowForm(true)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "var(--primary-color)",
                            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                            cursor: "pointer",
                            transition: "transform 0.2s"
                        }}
                    >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                    </div>
                </div>

                {/* Feedback Modal */}
                {showForm && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px"
                    }}>
                        <div style={{
                            background: "var(--card-bg)",
                            padding: "25px",
                            borderRadius: "16px",
                            width: "100%",
                            maxWidth: "400px",
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                            <button
                                onClick={() => setShowForm(false)}
                                style={{
                                    position: "absolute",
                                    top: "15px",
                                    right: "15px",
                                    background: "none",
                                    color: "var(--text-muted)",
                                    fontSize: "1.5rem",
                                    padding: "5px"
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{ marginBottom: "20px" }}>Your Feedback</h3>

                            {submitted ? (
                                <div style={{ textAlign: "center", padding: "20px 0", color: "var(--success-color)" }}>
                                    <p style={{ fontSize: "3rem", marginBottom: "10px" }}>✅</p>
                                    <p>Thank you! Your feedback has been sent.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Tell us what you think..."
                                        style={{
                                            width: "100%",
                                            height: "120px",
                                            padding: "15px",
                                            borderRadius: "12px",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "white",
                                            fontSize: "1rem",
                                            resize: "none",
                                            marginBottom: "20px",
                                            fontFamily: "inherit"
                                        }}
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            background: "var(--primary-color)",
                                            color: "#000",
                                            opacity: loading ? 0.7 : 1
                                        }}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Feedback"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: "3rem", textAlign: "center" }}>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>All rights reserved by Auto Savari</p>
                </div>
            </div>
        </div>
    );
}
