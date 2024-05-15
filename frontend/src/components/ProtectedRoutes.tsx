import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        checkAuth().catch(() => {
            setIsAuthorized(false);
        });
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const response = await api.post("/api/token/refresh/", {
                refresh_token: refreshToken,
            });
            
            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem("ACCESS_TOKEN", token);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error(error);
            setIsAuthorized(false);
        }
    }

    const checkAuth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token); 
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (currentTime > tokenExpiration) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (isAuthorized) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
} 

export default ProtectedRoute;