export const API_BASE = import.meta.env.VITE_API_URL || "https://api.tastycrunchmakhana.com";
export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
