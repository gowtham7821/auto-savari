import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function AutoLoginHandler() {
    const { currentUser, loading } = useAuth();
    const location = useLocation();
    const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
    const defaultEmail = "gowthamv7821@gmail.com";
    const defaultPassword = "Gowtham@1233";

    useEffect(() => {
        // AUTO-LOGIN DISABLED - Users will see Welcome screen first
        // Uncomment the code below to re-enable auto-login

        /*
        if (loading || hasAttemptedLogin) return;

        // List of paths where we DO NOT want auto-login to trigger
        const noAutoLoginPaths = ['/login', '/signup', '/driver-login'];
        const isExcludedPath = noAutoLoginPaths.includes(location.pathname);

        if (!currentUser && !isExcludedPath) {
            setHasAttemptedLogin(true);
            signInWithEmailAndPassword(auth, defaultEmail, defaultPassword)
                .then(() => {
                    console.log("Auto-login successful");
                })
                .catch(err => {
                    console.error("Auto-login failed:", err);
                    setHasAttemptedLogin(false); // Allow retry on next navigation
                });
        }
        */
    }, [currentUser, loading, location.pathname, hasAttemptedLogin]);

    return null;
}
