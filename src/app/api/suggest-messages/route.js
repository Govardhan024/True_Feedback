import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req) {
  try {
    // Parsing the request body to get the prompt (if dynamic input is needed)
    const { prompt } = await req.json();

    // Default prompt in case the request body does not include it
    const defaultPrompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const finalPrompt = prompt || defaultPrompt;

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      stream: true,
      prompt: finalPrompt,
    });
    console.log(response);

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
