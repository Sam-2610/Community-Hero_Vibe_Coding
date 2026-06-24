import React from 'react';
import { Award } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
          JD
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
          <p className="text-gray-500">Community Guardian Badge</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" /> Your Contributions
        </h3>
        <ul className="space-y-3">
          <li className="flex justify-between text-gray-600"><span>Issues Reported</span> <span className="font-bold text-gray-900">12</span></li>
          <li className="flex justify-between text-gray-600"><span>Issues Verified</span> <span className="font-bold text-gray-900">45</span></li>
          <li className="flex justify-between text-gray-600"><span>Reputation Points</span> <span className="font-bold text-blue-600">1,250</span></li>
        </ul>
      </div>
    </div>
  );
}