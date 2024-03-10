"use-client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils"; //this cn will be used to combine classes in the className attribute
//mainly used for tailwindcss

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-800 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-10 mb-14">
          <div className="relative w-12 h-12 mr-4">
            <Image src="/logo.png" alt="Logo" fill />
          </div>
          <h1 className={cn("text-3xl font-bold", montserrat.className)}>
            Navyug
          </h1>
        </Link>
      </div>
    </div>
  );
}
