import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generate plain text response
 */
export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate AI response.");
  }
};

/**
 * Generate JSON response
 */
export const generateJSON = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    // Remove markdown if Gemini wraps JSON
    text = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini JSON Error:", error);
    throw new Error("Failed to generate AI JSON.");
  }
};

export const generateJSONFromResume = async ({
  resumeUrl,
  prompt,
}) => {
  try {
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(response.data).toString(
      "base64"
    );

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64,
          },
        },
        {
          text: prompt,
        },
      ],
    });

    let text = result.text.trim();

    text = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error(
      "Gemini Resume Error:",
      error
    );

    throw new Error(
      "Failed to analyze resume."
    );
  }
};