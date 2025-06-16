import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px] text-black">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="btn-small bg-gradient-to-r from-rose-500 to-red-400 text-white hover:from-black hover:to-black hover:text-white transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
