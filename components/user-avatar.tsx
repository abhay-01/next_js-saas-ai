import {useUser} from "@clerk/nextjs"
import Image from "next/image"


export const UserAvatar = ()=>{

    const {user} = useUser();
    return(

        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={user?.primaryEmailAddress?.profileImageUrl} alt="User Avatar" layout="fill" objectFit="cover"/>
            </div>
            <div className="ml-3">
                <div className="font-semibold text-sm">{user?.fullName}</div>
                <div className="text-xs text-gray-400">{user?.primaryEmailAddress?.email}</div>
            </div>
        </div>

    )
}