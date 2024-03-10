"use client"

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect,useState } from "react";

export default function MobileSidebar() {

  const [isMounted,setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[]);


  if(!isMounted){
    return null;
  }

  return (
    //here, sheet is used for mobile view sidebar
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
