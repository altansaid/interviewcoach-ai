import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-[#EDEBFA] border border-purple-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-purple-300 relative group transition-transform duration-200 hover:-translate-y-1"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-semibold text-black">{role}</h2>
                <p className="text-xs text-medium text-black">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-purple-300 rounded-full bg-white">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border border-purple-300 rounded-full bg-white">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border border-purple-300 rounded-full bg-white">
            Last Updated: {lastUpdated}
          </div>
        </div>

        <p className="text-[12px] text-gray-700 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
