import express from 'express';
import { analyzeIssueImage } from '../services/geminiService.js'; // The service we built earlier

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Call the Gemini service
    const analysis = await analyzeIssueImage(imageBase64, mimeType || 'image/jpeg');
    
    res.json(analysis);
  } catch (error) {
    console.error('Route Error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

export default router;