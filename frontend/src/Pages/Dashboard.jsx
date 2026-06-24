import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  // Mock data for the MVP dashboard
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">City Impact Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Active Issues</p>
            <p className="text-2xl font-bold text-gray-900">142</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Resolved</p>
            <p className="text-2xl font-bold text-gray-900">89</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Clock className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Avg. Resolution Time</p>
            <p className="text-2xl font-bold text-gray-900">4.2 Days</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
        [Heatmap Chart Placeholder for V2]
      </div>
    </div>
  );
}