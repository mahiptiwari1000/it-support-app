import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const { description } = await req.json();

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize this ticket description in a few sentences: "${description}"`,
      max_tokens: 50,
    });

    const summary = response.data.choices[0].text.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error summarizing ticket:", error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Error summarizing ticket description' }, { status: 500 });
  }
}
