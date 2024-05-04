import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem("tokens");
  const [token, setToken] = useState(() =>
    currentToken ? JSON.parse(currentToken) : null,
  );
  const [user, setUser] = useState(() =>
    currentToken ? jwtDecode(JSON.parse(currentToken).access) : null,
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const endpoint = "http://localhost:8000/api/auth/login/";
    try {
      const response = await axios.post(
        endpoint,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.data;
      if (response.status === 200) {
        setToken({ access: data.access, refresh: data.refresh });
        setUser(jwtDecode(data.access));
        localStorage.setItem("tokens", JSON.stringify(data));
        // navigate("/profile");
        navigate("/home");
        console.log(user);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setToken(null);
    setUser(null);
    window.location.href = "/";
    navigate("/");
  };

  const updateTokens = async () => {
    const endpoint = "http://127.0.0.1:8000/api/auth/login/refresh/";
    const response = await axios.post(
      endpoint,
      {
        refresh: token.refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = response.data;
    if (response.status === 200) {
      setToken({ access: data.access, refresh: data.refresh });
      setUser(jwtDecode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      const intervalId = setInterval(
        () => {
          updateTokens();
        },
        1000 * 60 * 4,
      );

      return () => clearInterval(intervalId);
    }
  }, [token]);

  const contextData = {
    user: user,
    login: login,
    logout: logout,
    updateTokens: updateTokens,
    loading: loading,
    setLoading: setLoading,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
