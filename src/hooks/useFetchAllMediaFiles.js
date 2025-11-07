import { useEffect, useState } from "react";


export function useGetAllMedia() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // const res = await fetch("http://localhost:3000/api/media/getAllMedia", {
        const res = await fetch("https://cloudstorebackend-i2n1.onrender.com/api/media/getAllMedia", {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setMediaList(data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return { mediaList, loading, error };
}
