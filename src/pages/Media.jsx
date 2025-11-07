import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllMedia } from "../hooks/useFetchAllMediaFiles";

function Media() {
  const { mediaList, loading, error } = useGetAllMedia();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-muted-foreground">
        Loading media...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Your Media Collection
        </h1>

        {mediaList.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No media uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {mediaList.map((media) => {
                console.log("this is midia: " , media);
                
              const preview = media.files?.[0];
              const imageUrl = preview?.url ? `${preview.url}?t=${media._id}` : null;

              return (
                <div
                  key={media._id}
                  onClick={() => navigate(`/media-by-id?mediaId=${media._id}`)}
                  className="cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.03] transition-transform duration-300"
                >
                  {imageUrl ? (
                    preview.type === "image" ? (
                      <img
                        src={imageUrl}
                        alt={media.title}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={imageUrl}
                        className="w-full h-56 object-cover"
                        muted
                        loop
                        autoPlay
                      />
                    )
                  ) : (
                    <div className="h-56 flex items-center justify-center text-muted-foreground">
                      No preview
                    </div>
                  )}

                  <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {media.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {media.description}
                    </p>
                    <p className="text-xs text-primary mt-1">{media.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Media;
