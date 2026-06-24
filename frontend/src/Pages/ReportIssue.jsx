import React, { useState, useRef } from "react";
import { useGemini } from "../hooks/useGemini";
import { supabase } from "../lib/supabase";
import { Camera, MapPin, Loader2 } from "lucide-react";

export default function ReportIssue() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    severity: "",
    description: "",
  });
  const fileInputRef = useRef(null);
  const { analyzeImage, isAnalyzing } = useGemini();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setImage(base64);
        const aiResult = await analyzeImage(base64);
        if (aiResult) setFormData({ ...aiResult });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Default coordinates to Ranchi
      let lat = 23.3441,
        lng = 85.3096;

      // Get real GPS location if allowed
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        } catch (geoError) {
          console.warn("Location denied. Using default coords.");
        }
      }

      // Save to Supabase
      const { error } = await supabase.from("issues").insert([
        {
          title: formData.title,
          category: formData.category,
          severity: formData.severity,
          description: formData.description,
          latitude: lat,
          longitude: lng,
          image_url: "placeholder", // Update this later when adding file storage
          status: "Reported",
        },
      ]);

      if (error) throw error;

      alert("Issue reported successfully!");

      // Clear form
      setFormData({ title: "", category: "", severity: "", description: "" });
      setImage(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit issue. Check console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report an Issue</h1>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6 hover:bg-gray-50 transition"
        onClick={() => fileInputRef.current.click()}
      >
        {image ? (
          <img
            src={image}
            className="mx-auto h-48 object-cover rounded-md shadow-sm"
            alt="Preview"
          />
        ) : (
          <div className="flex flex-col items-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-500 font-medium">
              Tap to snap a photo
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>

      {isAnalyzing && (
        <div className="flex items-center justify-center gap-2 mb-6 text-blue-600 bg-blue-50 p-3 rounded-lg">
          <Loader2 className="animate-spin w-5 h-5" />
          <span className="font-medium">
            AI is analyzing visual evidence...
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Issue Title"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Category"
            required
          />
          <input
            type="text"
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value })
            }
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Severity"
            required
          />
        </div>

        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Detailed Description"
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-md"
        >
          <MapPin className="w-5 h-5" /> Submit & Tag Location
        </button>
      </form>
    </div>
  );
}
