'use client';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeInput, setRecipeInput] = useState('Pesto');

  const handleQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: recipeInput })
      });
      
      const data = await response.json();
      setResult(data.result || JSON.stringify(data));
    } catch (error) {
      setResult('Fehler beim Abrufen: ' + String(error));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          🍳 Rezept-Generator
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Powered by DeepSeek AI
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Wonach suchst du?
          </label>
          <input
            type="text"
            value={recipeInput}
            onChange={(e) => setRecipeInput(e.target.value)}
            placeholder="z.B. Pesto, Lasagne, Tiramisu..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
          />
          
          <button
            onClick={handleQuery}
            disabled={loading || !recipeInput.trim()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            {loading ? '⏳ Rezept wird erstellt...' : '🔍 Rezept generieren'}
          </button>
        </div>
        
        {result && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="font-bold mb-4 text-2xl text-gray-800">
              📋 Dein Rezept:
            </h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans bg-gray-50 p-4 rounded">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

