import { Heading } from "@/components/heading";
import { Video } from "lucide-react";


export default function ConversationsPage() {
    return(
        <>
         <div>
        <Heading
        title="Conversation"
        description="AI"
        icon={Video}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
        />
        </div>
        </>
       
    )
    }