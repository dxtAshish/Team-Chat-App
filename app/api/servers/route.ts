import { currentProfile } from "@/lib/current-profile";
import{v4 as uuidv4} from 'uuid'
import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req:Request){
    try {
       const {name,imageUrl}= await req.json()
       const profile= await currentProfile();

       if(!profile)
        {
            return new NextResponse('unauthrized',{status:401})
        }
        const server = await db.server.create({
            data:{
                profileId:profile.id,
                name,
                imageUrl,
                inviteCode:uuidv4(),
                Channel:{
                    create:[
                    {
                        name:"genrel",
                        profileId:profile.id
                    }
                ]},
                member:{
                    create:[
                        {
                            profileId:profile.id,
                            role:MemberRole.ADMIN,
                        }
                    ]
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("[server_post]",error);
        return new NextResponse("Internal error",{status:500})
    }
}