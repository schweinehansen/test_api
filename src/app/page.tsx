'use client';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Rezept für Pesto' })
      });
      
      const data = await response.json();
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setResult(summary);
    } catch (error) {
      setResult('Fehler beim Abrufen');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Rezept-API Test</h1>
      <button
        onClick={handleQuery}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mb-6"
      >
        {loading ? 'Lädt...' : 'Pesto-Rezept abrufen'}
      </button>
      
      {result && (
        <div className="bg-white p-6 rounded shadow-lg max-w-2xl">
          <h2 className="font-bold mb-4">Ergebnis:</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
