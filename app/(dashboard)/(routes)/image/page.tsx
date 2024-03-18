import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";


export default function ConversationsPage() {
    return(
        <>
         <div>
        <Heading
        title="Image Generation"
        description="AI"
        icon={ImageIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
        />
        </div>
        </>
       
    )
    }