import { useState } from 'react';

export const useGemini = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyzeImage = async (base64Image) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Strip the data URL prefix (e.g., "data:image/jpeg;base64,") before sending
        body: JSON.stringify({
          imageBase64: base64Image.split(',')[1], 
          mimeType: base64Image.split(';')[0].split(':')[1],
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeImage, isAnalyzing, error };
};