import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepSeek API Key nicht konfiguriert' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'user',
          content: `Gib mir ein einfaches Rezept für: ${query}\n\nFormatierung:\nZutaten:\n- ...\n\nZubereitung:\n1. ...`
        }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: 'DeepSeek API Fehler', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    const recipe = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      result: recipe || 'Keine Antwort von DeepSeek'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Fehler', details: String(error) },
      { status: 500 }
    );
  }
}
