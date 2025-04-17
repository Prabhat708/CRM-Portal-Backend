import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const APP_URI = import.meta.env.VITE_API_BASE_URI;

    const verifyUser = async () => {
        try {
            const response = await fetch(`${APP_URI}/api/auth/me`, {
                method: "GET",
                credentials: "include",  // ✅ Ensures cookies are sent
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Unauthorized");

            const result = await response.json();
            if(result.status !="success"){
                setIsLoggedIn(false)
                logout();
            }
            setIsLoggedIn(true);
            setUserData(result.user);
        } catch (error) {
            console.error("Auth Error:", error.message);
            logout();  // Clears state on unauthorized access
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(`${APP_URI}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            setIsLoggedIn(false);
            setUserData(null);
        } catch (error) {
            console.error("Logout Failed:", error.message);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
