import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/Inputs/Input";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { APP_FEATURES } from "../utils/data";
import { LuSparkles } from "react-icons/lu";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {
    const match = location.pathname.match(/^\/reset-password\/(.+)/);
    if (match) {
      const token = match[1];
      setResetToken(token);
      setCurrentPage("resetPassword");
      setOpenAuthModal(true);
    }
  }, [location]);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#151322] text-black">
        <div className="w-[500px] max-w-full h-[500px] bg-[#4B3C8F]/30 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[100px] relative z-10">
          <header className="flex justify-between items-center mb-16">
            <div
              className="text-4xl text-transparent bg-clip-text animate-text-shine font-semibold"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #9F7AEA, #ffd66ba8, #FFD66B, #805AD5, #9F7AEA)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Interview Coach AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#FFD66B] hover:text-black transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-xs text-[#9F7AEA] font-semibold bg-[#2D1E4A] px-3 py-1 rounded-full border border-[#805AD5] shadow-sm">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-white font-medium mb-6 leading-tight">
                Your Personal <br />
                <span
                  className="text-transparent bg-clip-text animate-text-shine font-semibold"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #9F7AEA, #ffd66ba8, #FFD66B, #805AD5, #9F7AEA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Interview Coach AI <br />
                </span>
                Always On
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-200 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#FFD66B] hover:text-black transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full bg-[#151322] text-black relative z-10">
        <div className="container mx-auto px-4 pt-10 pb-20 relative">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center text-white mb-12 relative z-10">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#c8c0f9] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-purple-400 transition border border-gray-100 hover:border-purple-500 hover:-translate-y-1 transform duration-200"
                  >
                    <h3 className="text-base font-extrabold mb-3 text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 font-semibold">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#c8c0f9] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-purple-400 transition border border-gray-100 hover:border-purple-500 hover:-translate-y-1 transform duration-200"
                  >
                    <h3 className="text-base font-extrabold mb-3 text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 font-semibold">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "forgotPassword" && (
            <ForgotPassword setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "resetPassword" && (
            <ResetPassword token={resetToken} setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
