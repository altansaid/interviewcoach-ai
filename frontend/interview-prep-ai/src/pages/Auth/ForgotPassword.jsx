import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email,
      });
      setMessage(res.data.message || "Reset link sent to your email.");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Reset Your Password</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Enter your email and we’ll send you a reset link.
      </p>

      <form onSubmit={handleForgotPassword}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
        />

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        {message && <p className="text-green-600 text-xs mt-2">{message}</p>}

        <button type="submit" className="btn-primary mt-4" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Remember your password?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Go back to Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
