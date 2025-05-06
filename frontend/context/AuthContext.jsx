import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
  
      if (userData && userData !== "undefined") {
        setUser(JSON.parse(userData));
      } else {
        // Clear invalid data if found
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);
  

  const login = async (email, password) => {
    const res = await axios.post("/api/users/login", { email, password });
  // Store both token and user
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user)); // Stringify user before storing

  setUser(res.data.user);
     console.log("Login success:", res.data);
  console.log("User in localStorage:", localStorage.getItem("user"));
  console.log("Token in localStorage:", localStorage.getItem("token"));
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/api/users/register", { name, email, password });
    // Store both token and user
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user)); // Stringify user before storing

  setUser(res.data.user);
  };

  const logout = () => {
    axios.get("/api/users/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token as well
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.patch(`/api/users/update/${user._id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the user in the context after successful update
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;  // Return the updated user
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/delete/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Remove token as well
      setUser(null);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, deleteUser,setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

