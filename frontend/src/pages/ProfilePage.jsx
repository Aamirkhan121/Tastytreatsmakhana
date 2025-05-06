import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user, updateUser, deleteUser, logout,setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    // Make sure user data is available when the page loads
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUser({ name, email });
      alert("Profile updated!");
      // Optionally update name/email in local state if needed
      setUser(updatedUser); // Uncomment if you want to update the context state
      // setName(updatedUser.name);
      // setEmail(updatedUser.email);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser();
        alert("Account deleted");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">My Profile</h2>
        
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Update Button */}
          <div>
            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>

          {/* Delete Account Button */}
          <div>
            <button
              onClick={handleDelete}
              className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
