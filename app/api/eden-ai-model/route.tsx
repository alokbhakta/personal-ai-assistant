import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { provider, userInput, aiResp } = await req.json();

    const headers = {
      Authorization: `Bearer ${process.env.EDEN_AI_API_KEY}`, // your OpenRouter API Key
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // optional
    };

    const url = "https://openrouter.ai/api/v1/chat/completions";

    const body = JSON.stringify({
      model: "deepseek/deepseek-prover-v2:free", // ex: "google/gemini-2.0-flash-exp:free"
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userInput
            }
          ]
        }
        
      ]
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    const result = await response.json();
    console.log(result);
    const resp={
        role:'assistant',
        content: result?.choices?.[0]?.message?.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Make text inside ** ** bold
        .replace(/\* (.+)/g, '• $1')                     // Replace bullet points (*) nicely
        .replace(/\n\n/g, '<br/><br/>')                   // Double newlines -> two line breaks
        .replace(/\n/g, '<br/>') 
      
    }
    // console.log(resp);
    return NextResponse.json(resp);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
