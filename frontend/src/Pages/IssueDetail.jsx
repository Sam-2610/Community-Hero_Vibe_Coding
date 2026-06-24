import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  ArrowLeft,
  MapPin,
  Clock,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssueDetail();
  }, [id]);

  const fetchIssueDetail = async () => {
    const { data, error } = await supabase
      .from("issues")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching issue:", error);
    } else {
      setIssue(data);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!issue) return;

    const { error } = await supabase
      .from("issues")
      .update({ verification_count: issue.verification_count + 1 })
      .eq("id", issue.id);

    if (!error) {
      setIssue({ ...issue, verification_count: issue.verification_count + 1 });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 font-medium">
        Loading issue details...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800">Issue not found</h2>
        <Link
          to="/feed"
          className="text-blue-600 hover:underline mt-4 inline-block font-medium"
        >
          Return to Live Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 mt-6">
      <Link
        to="/feed"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Live Feed
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center border-b border-gray-100 relative">
          {issue.image_url && issue.image_url !== "placeholder" ? (
            <img
              src={issue.image_url}
              alt={issue.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
              <span>No image provided</span>
            </div>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-blue-800 text-sm font-bold rounded-full shadow-sm">
              {issue.category}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {issue.title}
            </h1>
            <span
              className={`px-3 py-1 text-sm font-bold rounded-full border ${
                issue.severity === "Critical"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : issue.severity === "High"
                    ? "bg-orange-50 text-orange-700 border-orange-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              {issue.severity} Priority
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400" />{" "}
              {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-gray-400" />{" "}
              {new Date(issue.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg font-medium text-gray-700">
              {issue.status === "Resolved" ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              )}
              Status: {issue.status}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI Assessment
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
              {issue.description ||
                "No specific details provided. Assessed visually by Gemini."}
            </p>
          </div>

          <div className="flex items-center justify-between bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div>
              <h4 className="font-bold text-blue-900">
                Community Verification
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                {issue.verification_count} citizens have confirmed this issue.
              </p>
            </div>
            <button
              onClick={handleVerify}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg"
            >
              <ThumbsUp className="w-5 h-5" /> Verify This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
