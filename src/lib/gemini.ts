import { GoogleGenAI } from "@google/genai";

// The GEMINI_API_KEY is automatically injected by AI Studio
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features might not work.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });
