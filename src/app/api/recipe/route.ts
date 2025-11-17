import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    
    // Google Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Gib mir eine kurze Zusammenfassung für: ${query}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        })
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'API Error', details: String(error) },
      { status: 500 }
    );
  }
}
