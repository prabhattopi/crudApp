import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth/auth";
import "../components/Signup.css"; // Import the CSS file for Login component styles
import Logo from "../assets/Logo.png"
import ForgetToken from "../components/ForgetToken";
const Forget = () => {
  const [email, setEmail] = useState("");
  const {login,forgetPassword}= useContext(AuthContext)
  const searchQuery=useSearchParams()[0]
  const navigate=useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword({email})
  };

if(searchQuery.get("token")){
 return (
     <ForgetToken token={searchQuery.get("token")}/>
 
 )
}
  return (
    <div className="fixed inset-0 flex flex-col items-center  bg-gray-100 px-4 py-4">
        <img src={Logo} alt="Logo" width="150px" height="150px" className="rounded-full mb-4"/>
      <div className="bg-white shadow-md rounded-md px-8 py-6 max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Enter your verification email
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

      
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;