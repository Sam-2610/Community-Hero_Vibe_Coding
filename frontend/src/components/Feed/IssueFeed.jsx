import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ThumbsUp, MapPin, Clock, AlertTriangle } from 'lucide-react';

export default function IssueFeed() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setIssues(data);
    
    setLoading(false);
  };

  const handleVerify = async (id, currentCount) => {
    const { error } = await supabase
      .from('issues')
      .update({ verification_count: currentCount + 1 })
      .eq('id', id);

    if (!error) {
      fetchIssues(); // Refresh feed
    }
  };

  if (loading) return <div className="p-8 text-center">Loading community issues...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Community Reports</h2>
      
      {issues.map((issue) => (
        <div key={issue.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {issue.category}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  issue.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {issue.severity}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{issue.title}</h3>
              <p className="text-gray-600 mt-2">{issue.description}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Location Tagged</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Just now</span>
            </div>
            
            <button 
              onClick={() => handleVerify(issue.id, issue.verification_count)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition font-medium text-gray-700"
            >
              <ThumbsUp className="w-4 h-4 text-green-600" />
              Verify ({issue.verification_count})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}