import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import AutoLoginHandler from "./components/AutoLoginHandler";
import PassengerHome from "./pages/PassengerHome";
import DriverDashboard from "./pages/DriverDashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DriverLogin from "./pages/DriverLogin";

function App() {
    return (
        <AuthProvider>
            <Router>
                <AutoLoginHandler />
                <NavBar />
                <Routes>
                    <Route path="/home" element={<PassengerHome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/driver-dashboard" element={<DriverDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/driver-login" element={<DriverLogin />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
