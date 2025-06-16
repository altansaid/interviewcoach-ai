import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ResetPassword = ({ token, setCurrentPage }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axiosInstance.post(
        `${API_PATHS.AUTH.RESET_PASSWORD}/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      setMessage(res.data.message || "Password reset successful.");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setCurrentPage("login");
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-[#EDEBFA] rounded-xl border border-purple-300">
      <h3 className="text-lg font-semibold text-black mb-2">Reset Password</h3>
      <p className="text-xs text-gray-700 mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleReset} className="grid gap-3">
        <Input
          label="New Password"
          placeholder="Enter new password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Input
          label="Confirm Password"
          placeholder="Re-enter new password"
          type="password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        {message && <p className="text-green-600 text-xs pb-2.5">{message}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#FFD66B] hover:text-black transition-colors cursor-pointer w-full mt-2"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
