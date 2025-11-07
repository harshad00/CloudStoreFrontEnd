import { useEffect, useState } from "react";

export function useFetchMediaFiles(mediaId) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mediaId) return;

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:3000/api/media/getByMediaId?mediaId=${mediaId}`,
          {
            method: "GET",
            credentials: "include", // ✅ send cookies
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch media files");
        }

        const data = await res.json();
        console.log("🔍 API Response:", data); // <-- Add this

        // ✅ Auto-handle multiple response shapes
        setFiles(data.mediaFiles || data.data || data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [mediaId]);

  return { files, loading, error };
}
