import {auth} from "@clerk/nextjs";

import prismadb from "./prismadb";

import { MAX_FREE_LIMIT } from "@/public/constants";
import { use } from "react";

export const increaseLimit = async ()=>{
    const {userId} = auth();

    if(!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });


    if(!userApiLimit){
        await prismadb.userApiLimit.create({
            where:{userId: userId},
            data:{
                count: userApiLimit.count + 1
            }
        })
    }else{
        await prismadb.userApiLimit.create({
            data:{
                count: 1,
                userId: userId
            }
        })
    }

};

//
export const checkLimit = async ()=>{
    const {userId} = auth();

    if(!userId) return false;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_LIMIT){
        return true;
    }else{  
        return false;
    }
}