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
    const { prompt, amount="1", resolution = "256x256"} = body;

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

    if (!resolution) {
      return new NextResponse("Resolution is required", {
          status: 400,
      });
  }

  if (!amount) {
    return new NextResponse("Amount is required", {
        status: 400,
    });
}

const result = await openai.images.generate({
    prompt,
    n: parseInt(amount),
    size: resolution,
  });

  return NextResponse.json(result.data);


  } catch (err) {
    console.log("IMAGES ERROR:==", err);
    return new NextResponse("Interanl Server Error", {
      status: 500,
    });
  }
}
