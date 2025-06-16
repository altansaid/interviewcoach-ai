import React from "react";
import { useNavigate } from "react-router-dom";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#1A1A2E] text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-0 py-10 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-white hover:bg-yellow-400/10 border border-white/10 px-3 py-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            <div className="text-right">
              <h2 className="text-2xl font-semibold text-yellow-300 animate-text-glow">
                {role}
              </h2>
              <p className="text-sm text-gray-200 mt-1">{topicsToFocus}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-medium text-white bg-[#303049] px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </span>

            <span className="text-[11px] font-medium text-white bg-[#303049] px-3 py-1 rounded-full">
              {questions} Q&A
            </span>

            <span className="text-[11px] font-medium text-white bg-[#303049] px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[50vw] h-full z-0">
        <div className="w-28 h-28 bg-yellow-400/30 blur-[80px] animate-blob1 absolute top-5 left-5" />
        <div className="w-24 h-24 bg-teal-300/20 blur-[80px] animate-blob2 absolute top-16 right-10" />
        <div className="w-20 h-20 bg-fuchsia-400/20 blur-[60px] animate-blob3 absolute bottom-5 left-20" />
      </div>
    </div>
  );
};

export default RoleInfoHeader;
