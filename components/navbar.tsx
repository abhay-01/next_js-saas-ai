import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";



export default function Navbar() {
  return (
   
    <div>
        <MobileSidebar/>
       
        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  );
}