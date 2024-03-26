import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Configuration, { ClientOptions, OpenAI } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }if(!config.apiKey){
      return new NextResponse("OpenAI API Key is required", {
        status: 500,
      });
    }

    if (!prompt) {
        return new NextResponse("Prompt is required", {
            status: 400,
        });
    }

 const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
 });

 return NextResponse.json(result.choices[0].message);

  } catch (err) {
    console.log("CONVERSATION ERROR:==", err);
    return new NextResponse("Interanl Server Error", {
      status: 500,
    });
  }
}
