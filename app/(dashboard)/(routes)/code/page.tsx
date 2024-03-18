import { Heading } from "@/components/heading";
import { Code } from "lucide-react";


export default function ConversationsPage() {
    return(
        <>
         <div>
        <Heading
        title="Conversation"
        description="AI"
        icon={Code}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
        />
        </div>
        </>
       
    )
    }