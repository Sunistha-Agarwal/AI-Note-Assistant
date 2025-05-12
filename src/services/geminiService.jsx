import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function summarizeNote(noteContent) {
  const prompt = `Summarize the following note:\n\n${noteContent}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini summarization error:', error);
    return null;
  }
}

export async function completeNote(promptStart) {
  const prompt = `Continue writing the following note:\n\n${promptStart}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini completion error:', error);
    return null;
  }
}
