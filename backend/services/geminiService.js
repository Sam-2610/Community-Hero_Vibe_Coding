import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your Google AI Studio key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeIssueImage = async (base64Image, mimeType) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert civic infrastructure analyst. Analyze this image of a community issue.
      Return ONLY a raw JSON object with no markdown formatting, backticks, or extra text.
      The JSON must strictly follow this structure:
      {
        "title": "Short, descriptive title",
        "category": "Choose one: [Pothole, Waste Management, Streetlight, Water Leak, Vandalism, Infrastructure, Other]",
        "severity": "Choose one: [Low, Medium, High, Critical]",
        "description": "Clear, objective description of the visual evidence.",
        "confidence": "A score from 0-100 indicating how certain you are of this assessment"
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      },
    ]);

    const responseText = result.response.text();

    // Clean up response in case Gemini returns markdown block wrappers
    const cleanedText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw new Error("Failed to analyze image using Gemini API");
  }
};
