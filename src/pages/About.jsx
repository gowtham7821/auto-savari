import React from 'react';

export default function About() {
    return (
        <div className="container">
            <div className="card">
                <h1>About Auto Savari</h1>
                <p style={{ marginTop: "1rem", lineHeight: "1.6", color: "var(--text-muted)" }}>
                    Auto Savari is a real-time ride-sharing application designed to connect passengers with auto-rickshaw drivers seamlessly.
                </p>
                <p style={{ marginTop: "1rem", lineHeight: "1.6", color: "var(--text-muted)" }}>
                    <strong>Our Mission:</strong> To provide a reliable, safe, and efficient transportation solution for everyone.
                </p>
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <p>Version 1.0.0</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>© 2024 Auto Savari Inc.</p>
                </div>
            </div>
        </div>
    );
}
