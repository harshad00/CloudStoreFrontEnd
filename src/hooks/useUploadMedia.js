import { useState } from "react";

export function useUploadMedia() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadMedia = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:3000/api/media/upload", {
          method: "POST",
          credentials: "include",
        body: formData, // FormData handles files automatically
      });

      if (!res.ok) {
        throw new Error("Failed to upload media");
      }

      const data = await res.json();
      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Upload Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadMedia, loading, error, success };
}
