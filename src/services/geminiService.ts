import { GoogleGenerativeAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY ist nicht konfiguriert!");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const fetchRecipe = async (recipeIdea: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const prompt = `Gib mir ein einfaches Rezept für ${recipeIdea} als Zusammenfassung. Formatiere die Zutaten als eine Liste mit Sternchen (*) und die Zubereitungsschritte als nummerierte Liste.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Fehler beim Abrufen des Rezepts:", error);
    if (error instanceof Error) {
      return `Fehler: ${error.message}`;
    }
    return "Ein unbekannter Fehler ist aufgetreten.";
  }
};
