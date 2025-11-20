import { GoogleGenAI } from "@google/genai";

// Initialize with process.env.API_KEY as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInviteCaption = async (activity: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash'; // Using Flash for speed on mobile
    const prompt = `Write a short, catchy, high-energy "Gen Z" style invite caption for the activity: "${activity}". 
    Max 12 words. Use 1-2 relevant emojis. 
    Examples: 
    "Coffee" -> "Caffeine drip needed ☕️ Who's alive?"
    "Gym" -> "Iron paradise calling 💪 Let's get it."
    "Tacos" -> "Taco time 🌮 Don't be boring."
    
    Return ONLY the text of the caption.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text?.trim() || `I'm down for ${activity}!`;
  } catch (error) {
    console.error("Gemini generation failed", error);
    // Fallback if API key is missing or error
    return `${activity} time! Who's down?`;
  }
};