import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      if (setPreview) {
        setPreview(preview);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="w-20 h-20 flex items-center justify-center bg-yellow-100 rounded-full relative cursor-pointer group transition"
          onClick={onChooseFile}
        >
          <LuUser className="text-4xl text-yellow-500 group-hover:scale-105 transition" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-full absolute -bottom-1 -right-1 transition"
          >
            <LuUpload size={16} />
          </button>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 transition"
            onClick={handleRemoveImage}
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
