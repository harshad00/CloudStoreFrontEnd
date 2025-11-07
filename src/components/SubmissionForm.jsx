import { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploadZone } from "./FileUploadZone";

 const SubmissionForm = () => {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["Documents", "Images", "Videos", "Audio", "Archives", "Other"];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      customCategory: "",
    },
  });

  const category = watch("category");

  const onSubmit = async (data) => {
    setMessage("");

    // simple validation
    if (!data.title || data.title.length < 3) {
      setMessage("❌ Title must be at least 3 characters");
      return;
    }
    if (!data.category) {
      setMessage("❌ Please select a category");
      return;
    }
    if (data.category === "Other" && (!data.customCategory || data.customCategory.length < 2)) {
      setMessage("❌ Please enter a custom category (at least 2 characters)");
      return;
    }
    if (files.length === 0) {
      setMessage("❌ Please upload at least one file");
      return;
    }

    setIsSubmitting(true);

    // simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const finalCategory =
      data.category === "Other" ? data.customCategory : data.category;

    console.log("Form submitted:", { ...data, category: finalCategory, files });
    setMessage("✅ Files uploaded successfully!");

    reset();
    setFiles([]);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl border mt-10">
      <h2 className="text-2xl font-bold mb-2 text-center">Upload Your Files</h2>
      <p className="text-gray-600 mb-6 text-center">
        Fill in the details and upload your files easily
      </p>

      {message && (
        <div
          className={`p-3 mb-4 text-center rounded-md ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title for your submission"
            {...register("title")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            onChange={(e) => setValue("category", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Category */}
        {category === "Other" && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <label htmlFor="customCategory" className="block font-medium mb-1">
              Custom Category
            </label>
            <input
              id="customCategory"
              type="text"
              placeholder="Enter your custom category (e.g., Family, Work)"
              {...register("customCategory")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-1">Files</label>
          <FileUploadZone files={files} onFilesChange={setFiles} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all"
        >
          {isSubmitting ? "Uploading..." : "Upload Files"}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;