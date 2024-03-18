"use client"

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Card } from "@/components/ui/card";
import { Code, Music, Video, ImageIcon, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";


const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function DashboardPage() {

  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8 justify-center">
          <div className="mr-4">
            <Image src="/logo.png" alt="Navyug Logo" width={40} height={40} />
          </div>
          <h1 className="text-4xl font-bold">Navyug</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:cursor-pointer" onClick={()=>router.push("/code")}>
            <Code className="text-5xl mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Code Generation</h2>
            <p className="text-gray-600 text-center">
              Generate code snippets effortlessly with our AI-powered platform.
            </p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:cursor-pointer" onClick={()=>router.push("/music")}>
            <Music className="text-5xl mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Music Generation</h2>
            <p className="text-gray-600 text-center">
              Create music tracks with our AI-powered platform.
            </p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:cursor-pointer" onClick={()=>router.push("/video")}> 
            <Video className="text-5xl mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Video Generation</h2>
            <p className="text-gray-600 text-center">
              Generate videos with our AI-powered platform.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:cursor-pointer" onClick={()=>router.push("/image")}>
            <ImageIcon className="text-5xl mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold mb-2">Image Generation</h2>
            <p className="text-gray-600 text-center">
              Generate images with our AI-powered platform.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:cursor-pointer" onClick={()=>router.push("/conversations")}>
            <MessageCircle className="text-5xl mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Chatbot</h2>
            <p className="text-gray-600 text-center">
              Chat with our AI-powered chatbot.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
