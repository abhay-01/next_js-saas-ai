"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils"; //this cn will be used to combine classes in the className attribute
//mainly used for tailwindcss

import {
  LayoutDashboard,
  MessageCircle,
  Music,
  Code,
  ImageIcon,
  Video,
  Settings,
  Zap
} from "lucide-react";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const sidebarRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    color: "text-red-400",
  },
  {
    name: "Conversations",
    path: "/conversations",
    icon: MessageCircle,
    color: "text-yellow-300",
  },
  {
    name: "Image Generation",
    path: "/image",
    icon: ImageIcon,
    color: "text-orange-400",
  },
  {
    name: "Music Generation",
    path: "/music",
    icon: Music,
    color: "text-blue-400",
  },
  {
    name: "Video Generation",
    path: "/video",
    icon: Video,
    color: "text-pink-300",
  },
  {
    name: "Code Generation",
    path: "/code",
    icon: Code,
    color: "text-emerald-400",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    color: "text-white",
  }
];

export default function Sidebar() {
  const pathname = usePathname(); //this is used to close the sidebar when the route changes
  //this also helps in highlighting the current route in the sidebar

  // Static counter for API hits
  const apiHits = 0;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-800 text-white">
      <div className="px-3 py-1 flex-1">
        <Link href="/dashboard" className="flex items-center pl-10 mb-14">
          <div className="relative w-12 h-12 mr-4">
            <Image src="/logo.png" alt="Logo" fill />
          </div>
          <h1 className={cn("text-3xl font-bold", montserrat.className)}>
            Navyug
          </h1>
        </Link>

        {/* SIDEBAR ROUTES */}

        <div className="space-y-1 ml-4">
          {sidebarRoutes.map((route, index) => (
            <Link
              href={route.path}
              key={index}
              className={cn("text-sm group flex p-3 w-full hover:bg-white/10 rounded-lg transition", pathname === route.path?"text-white bg-white/10":"text-zinc-400")}
            >
              <div
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-red-400",
                  "hover:bg-gray-700"
                )}
              >
                <route.icon className={cn("w-6 h-6 mr-2",route.color)} />
                <span>{route.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Counter for API Hits */}
      <div className="flex justify-center items-center bg-gray-700 text-sm py-2">
        <span className="mr-5 text-gray-400">API Hits:</span>
        <span className="text-white">{apiHits}</span>
        <Button className="w-full ml-2 mr-2" variant="premium">
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white"/>
        </Button>
      </div>
    </div>
  );
}
