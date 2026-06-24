import express from 'express';
const router = express.Router();

// Future route to use Gemini to analyze trends in the database
router.get('/weekly-report', (req, res) => {
  res.json({ message: 'AI insights endpoint active.' });
});

export default router;