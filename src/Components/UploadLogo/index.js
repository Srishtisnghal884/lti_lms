import React, { useRef, useState } from "react";

export default function UploadLogo() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="cus-logo ">
    <div className="upload-container">
      <h2 className="title">Upload Logo</h2>

      <div className="content-box">
        {/* Preview Box */}
        <div className="preview-box">
          {preview ? (
            <img src={preview} alt="preview" className="preview-img" />
          ) : (
            <span className="no-icon">No Icon</span>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileRef.current.click()}
          className="upload-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Upload Logo
        </button>

        {/* Hidden Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden-input"
          ref={fileRef}
          onChange={handleFile}
        />
      </div>
    </div>
    </div>
  );
}

