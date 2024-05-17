import { ReactNode, useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { updateAuthStatus } = useStateContext();

    useEffect(() => {
        checkAuth();
    }, []);

    const refreshToken = async (): Promise<void> => {
        const refreshToken = localStorage.getItem("refresh");
        console.log(`Refresh token: ${refreshToken}`);
        if (!refreshToken) {
          setIsAuthorized(false);
          return;
        }
      
        try {
          const response = await api.post("/api/token/refresh/", { refresh: refreshToken });
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
        const token = localStorage.getItem("access");
        if (!token) {
          setIsAuthorized(false);
          return;
        }
      
        const decoded = jwtDecode<JwtPayload>(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000;

        console.log(`Token expired at ${tokenExpiration}, refreshing...`)
        console.log(`Current time: ${currentTime}`);

        const expiresIn = tokenExpiration - currentTime;
        console.log(`Token expires in ${expiresIn} seconds`);
        
      
        if (currentTime > tokenExpiration) {
          try {
            await refreshToken();
          } catch (error) {
            console.error(error);
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(true);
        }
      };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        updateAuthStatus(false);
        navigate("/login");
        return null; // Ensuring nothing is rendered before navigating
    }

    return <>{children}</>;
};

export default ProtectedRoute;
