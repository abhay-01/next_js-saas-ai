import { Heading } from "@/components/heading";
import { Music } from "lucide-react";


export default function ConversationsPage() {
    return(
        <>
         <div>
        <Heading
        title="Music Generation"
        description="AI"
        icon={Music}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
        />
        </div>
        </>
       
    )
    }