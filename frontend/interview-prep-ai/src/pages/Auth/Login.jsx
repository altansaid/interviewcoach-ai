import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-[#EDEBFA] rounded-xl border border-purple-300">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-gray-700 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const res = await axiosInstance.post(API_PATHS.AUTH.GOOGLE, {
                credential: credentialResponse.credential,
              });

              const { token } = res.data;
              if (token) {
                localStorage.setItem("token", token);
                updateUser(res.data);
                navigate("/dashboard");
              }
            } catch (err) {
              setError("Google login failed. Please try again.");
            }
          }}
          onError={() => setError("Google login failed")}
          width="100%"
          shape="pill"
        />
        <div className="flex items-center my-4">
          <span className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-xs text-gray-500">or</span>
          <span className="flex-grow border-t border-gray-300" />
        </div>

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        <p
          className="text-[13px] text-[#6B46C1] underline cursor-pointer mt-2 mb-4"
          onClick={() => setCurrentPage("forgotPassword")}
        >
          Forgot your password?
        </p>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#FFD66B] hover:text-black transition-colors cursor-pointer w-full"
        >
          LOGIN
        </button>

        <p className="text-[13px] text-gray-800 mt-3">
          Don’t have an account?{" "}
          <button
            className="font-medium text-[#6B46C1] underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
