import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Configuration, { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);


const instruction : ChatCompletionMessageParam = {
    role:"system",
    content:"You are a code generator.You must answer user's code related queries.Use code comments to explain your code."
}

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
      messages: [instruction,...prompt]
 });

 return NextResponse.json(result.choices[0].message);

  } catch (err) {
    console.log("CODE ERROR:==", err);
    return new NextResponse("Interanl Server Error", {
      status: 500,
    });
  }
}
