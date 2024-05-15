import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface ProtectedRouteProps {
    children: ReactNode;
}

interface DecodedToken extends JwtPayload {
    exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        checkAuth().catch(() => {
            setIsAuthorized(false);
        });
    }, []);

    const refreshToken = async (): Promise<void> => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const response = await api.post("/api/token/refresh/", {
                refresh_token: refreshToken, 
            });

            if (response.status === 200) {
                const token = response.data.access;
                localStorage.setItem(ACCESS_TOKEN, token);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error(error);
            setIsAuthorized(false);
        }
    };

    const checkAuth = async (): Promise<void> => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded: DecodedToken = decode(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (currentTime > tokenExpiration) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
