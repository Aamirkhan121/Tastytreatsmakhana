import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely get and parse the user data from localStorage
    const userData = localStorage.getItem("user");

    try {
      if (userData && userData !== "undefined") {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/api/users/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/api/users/register", { name, email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);
  };

  const logout = () => {
    axios.get("/api/users/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.patch(
        `/api/users/update/${user._id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      throw new Error(
        err.response ? err.response.data.message : err.message
      );
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/delete/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        deleteUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


