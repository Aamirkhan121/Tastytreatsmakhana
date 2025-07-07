import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/products");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   console.log("Google login success:", credentialResponse);
  //   // Call backend or set token in localStorage
  //   navigate("/");
  // };

  // const handleFacebookSuccess = async (response) => {
  //   console.log("Facebook login success:", response);
  //   // Call backend or set token in localStorage
  //   navigate("/");
  // };

  return (
    // <GoogleOAuthProvider clientId="335286647979-tg4dktn3bbjsnqsbo58oo9sgvh7tp36s.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back 👋</h2>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-gray-600 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Social Login Divider */}
          {/* <div className="my-6 flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div> */}

          {/* Google Login */}
          {/* <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google login error")}
            />
          </div> */}

          {/* Facebook Login */}
          {/* <div className="flex justify-center">
            <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleFacebookSuccess}
              icon="fa-facebook"
              cssClass="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              textButton=" Login with Facebook"
            />
          </div> */}

          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    /* </GoogleOAuthProvider> */
  );
};

export default LoginPage;


