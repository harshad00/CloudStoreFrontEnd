import { useCallback, useState } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { cn } from "./lib/utils";

export const FileUploadZone = ({ files, onFilesChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      onFilesChange([...files, ...droppedFiles]);
    },
    [files, onFilesChange]
  );

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-accent/50 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-accent/30"
        )}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={cn(
              "p-4 rounded-full bg-accent transition-all duration-300",
              isDragging && "scale-110"
            )}
          >
            <Upload className="h-10 w-10 text-accent-foreground" />
          </div>
          <div>
            <p className="text-lg font-semibold">Drop files here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">
              Support for multiple file uploads
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Uploaded Files ({files.length})</h3>
          <div className="grid gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-accent rounded">
                    <FileIcon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
