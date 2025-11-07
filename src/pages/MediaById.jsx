import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchMediaFiles } from "../hooks/useFetchMediaFiles";

function MediaById() {
  const location = useLocation();
  const navigate = useNavigate(); // 🆕 for back navigation
  const params = new URLSearchParams(location.search);
  const mediaId = params.get("mediaId");

  const { files, loading, error } = useFetchMediaFiles(mediaId);
  const [preview, setPreview] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-muted-foreground">
        Loading media files...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        No files found for this media.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-10 px-6">
      <div className="container mx-auto">
        {/* 🆕 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-primary/40 rounded-lg text-base font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
        >
          ← Back
        </button>


        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Media Gallery
        </h1>

        {/* 🧱 Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file._id}
              className="relative group rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onClick={() => setPreview(file)}
            >
              {file.type === "image" && (
                <img
                  src={file.url}
                  alt="media"
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {file.type === "video" && (
                <video
                  src={file.url}
                  className="w-full h-72 object-cover"
                  muted
                  preload="metadata"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              )}

              {!["image", "video"].includes(file.type) && (
                <div className="h-72 flex items-center justify-center text-muted-foreground">
                  Unsupported file type
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-md text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium truncate">
                  {file.url.split("/").pop()}
                </p>
                {file.size && (
                  <p className="text-xs text-gray-300">
                    {Math.round(file.size / 1024)} KB
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🆕 Fullscreen Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              onClick={() => setPreview(null)}
            >
              ✕
            </button>

            {preview.type === "image" ? (
              <img
                src={preview.url}
                alt="preview"
                className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            ) : preview.type === "video" ? (
              <video
                src={preview.url}
                controls
                autoPlay
                className="max-h-[85vh] max-w-full rounded-xl shadow-lg"
              />
            ) : (
              <p className="text-white">Unsupported media type</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaById;
