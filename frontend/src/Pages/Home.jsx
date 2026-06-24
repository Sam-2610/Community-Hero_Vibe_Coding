import React from "react";
import { Link } from "react-router-dom";

import IssueMap from "../components/Map/Map"; // Import the map

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center mt-12 space-y-8 w-full">
      <h1 className="text-5xl font-black text-gray-900 tracking-tight">
        Fix Your City with <span className="text-blue-600">AI</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl">
        Snap a photo of a pothole, leak, or broken streetlight. Our AI
        categorizes it, tags the location, and alerts the community instantly.
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          to="/report"
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 shadow-lg transition"
        >
          Report an Issue
        </Link>
        {/* Safe Map Container */}
        <div className="w-full max-w-5xl h-[500px] mt-12 z-0 relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <IssueMap />
        </div>
        <Link
          to="/feed"
          className="px-8 py-4 bg-white text-blue-600 border border-blue-200 font-bold rounded-full hover:bg-blue-50 transition"
        >
          Community Feed
        </Link>
      </div>

      {/* Embedded Live Map Section */}
      <div className="w-full max-w-5xl h-[500px] mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <IssueMap />
      </div>
    </div>
  );
}
