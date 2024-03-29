import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/auth";
import "./Login.css"; // Import the CSS file for Login component styles
import Logo from "../assets/Logo.png"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password })
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center  bg-gray-100 px-4 py-4">
      <img src={Logo} alt="Logo" width="150px" height="150px" className="mb-4" />
      <div className="bg-white shadow-md rounded-md px-8 py-6 max-w-md w-full">

        <h2 className="text-2xl font-bold mb-4 uppercase">Login</h2>
        {/* <div className="flex justify-center gap-16 items-center bg-white shadow-md rounded-md p-4 w-full mb-4">
        <FcGoogle size={30}/>
        <ImGithub size={30}/>
        </div> */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-2 border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <p className="text-sm text-gray-500 mb-4 animated-text">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
          <p className="text-sm text-gray-500 mb-4 mt-4">
            <Link to="/forget" className="text-blue-500">
              Forgot password?

            </Link>

          </p>



          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
