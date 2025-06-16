import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-[#1B1831] border-b border-purple-800/40 backdrop-blur-[4px] py-2.5 px-4 md:px-0 sticky top-0 z-30 shadow-md shadow-purple-800/5">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-semibold text-[#FFD66B] leading-5 tracking-wide">
            Interview Prep AI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
