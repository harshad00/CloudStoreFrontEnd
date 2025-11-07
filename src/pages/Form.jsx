import React, { useState, useEffect } from "react";
import { useUploadMedia } from "../hooks/useUploadMedia";
import { useNavigate } from "react-router-dom";

function SubmissionForm() {
  const { uploadMedia, loading, error, success } = useUploadMedia();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    if (files.length > 10) {
      alert("You can upload a maximum of 10 files at once.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    await uploadMedia(formData);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // ✅ navigate when upload is successful
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/media");
      }, 1000); // small delay for UX
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          className="w-full"
          onChange={handleFileChange}
          multiple
          required
        />
        <p className="text-xs text-muted-foreground">
          You can select up to 10 files.
        </p>

        {files.length > 0 && (
          <ul className="text-sm text-foreground/80">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Upload successful! Redirecting...</p>}
      </form>
    </div>
  );
}

export default SubmissionForm;
