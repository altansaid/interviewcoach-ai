import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[#EDEBFA] border border-gray-200 rounded-xl p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div className="flex items-start justify-between">
        {/* Left side: Q + Question */}
        <div className="flex items-start gap-3.5">
          <span className="text-sm font-bold text-gray-500">Q</span>
          <h3
            className="text-sm md:text-base font-medium text-black cursor-pointer"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        {/* Right side: Buttons + Chevron */}
        <div className="flex items-center gap-1 ml-4">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            {/* Pin Button */}
            <button
              className="flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-3 py-1 mr-2 rounded border border-yellow-100 hover:bg-yellow-200 transition"
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden md:inline">
                {isPinned ? "Unpin" : "Pin"}
              </span>
            </button>

            {/* Learn More Button */}
            <button
              className="flex items-center gap-1 text-xs font-medium text-purple-800 bg-purple-100 px-3 py-1 mr-2 rounded border border-purple-100 hover:bg-purple-200 transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles size={14} />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>

          {/* Expand / Collapse Icon */}
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-black   bg-[#EDEBFA] px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
