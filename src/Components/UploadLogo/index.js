import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAddLogoImageMutation } from "../../Features/Admin/adminApiSlice";

export default function UploadLogo() {
  const [addLogoImage] = useAddLogoImageMutation();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  const handleSave = async () => {
    if (!selectedFile) {
      alert("Please select a logo first!");
      return;
    }

    setLoading(true);

    try {
     const result =  await addLogoImage(selectedFile).unwrap();
       const uploadedLogoUrl = result?.url || preview;
       console.log("Upload response:", result);

    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, logo: uploadedLogoUrl })
    );  // <-- send only file
      alert("Logo saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading logo");
    } finally {
      setLoading(false);
    }
  };


  // const handleSave = async () => {
  //   if (!selectedFile) {
  //     alert("Please select a logo first!");
  //     return;
  //   }

  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("logo", selectedFile);

  //   try {
  //     const res = await fetch("/api/upload-logo", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error("Upload failed");

  //     const data = await res.json();
  //     alert("Logo saved successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error uploading logo");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  return (
    <div className="cus-logo">
      <div className="upload-container">
        <h2 className="title">Upload Logo</h2>

        <div className="content-box">

          {/* Preview Box - Clickable */}
          <div
            className="preview-box"
            onClick={() => fileRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            {preview ? (
              <img src={preview} alt="preview" className="preview-img" />
            ) : (
              <span className="no-icon">Click to Upload</span>
            )}
          </div>

          {/* Upload Button */}


          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden-input"
            ref={fileRef}
            onChange={handleFile}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <button
              onClick={() => fileRef.current.click()}
              className="upload-btn"
            >
            
              Upload Logo
            </button>
            <button
              onClick={handleSave}
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Logo"}
            </button>
          </Box>
          {/* SAVE BUTTON */}

        </div>
      </div>
    </div>
  );
}
