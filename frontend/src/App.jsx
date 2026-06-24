import React from "react";
import IssueDetail from "./pages/IssueDetail";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReportIssue from "./pages/ReportIssue";
import IssueFeed from "./components/Feed/IssueFeed";
import IssueMap from "./components/Map/Map";

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter">
              CommunityHero
            </h1>
            <div className="space-x-6 font-medium text-gray-600">
              <Link to="/" className="hover:text-blue-600">
                Map View
              </Link>
              <Link to="/feed" className="hover:text-blue-600">
                Live Feed
              </Link>
              <Link
                to="/report"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Report Issue
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="mt-6">
                  <IssueMap />
                </div>
              }
            />
            <Route path="/issue/:id" element={<IssueDetail />} />

            <Route path="/feed" element={<IssueFeed />} />
            <Route path="/report" element={<ReportIssue />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
