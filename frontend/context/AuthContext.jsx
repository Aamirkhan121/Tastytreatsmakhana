import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely get and parse the user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser._id) {  // Check if the user data is valid
          setUser(parsedUser);  // Set the user state if valid
        } else {
          console.warn("Invalid user data found in localStorage");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("https://tastytreatsmakhana.onrender.com/api/users/login", { email, password });

    // Store both token and user if login is successful
    if (res.data && res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Stringify user before storing

      setUser(res.data.user);
    } else {
      console.error("Invalid response from login API.");
    }
  };

  const register = async (name, email, password) => {
    const res = await axios.post("https://tastytreatsmakhana.onrender.com/api/users/register", { name, email, password });

    // Store both token and user if registration is successful
    if (res.data && res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Stringify user before storing

      setUser(res.data.user);
    } else {
      console.error("Invalid response from register API.");
    }
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

