import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
export const NavigationSideBar=async ()=>{
    const profile= await currentProfile();
    if(!profile)
        {
            return redirect('/')
        }
        const servers= await db.server.findMany({
            where:{
                member:{
                    some:{
                        profileId:profile.id,
                    }
                }
            }
        })
    return(
        <div className="space-y-4 h-full flex flex-col items-center w-full text-primary dark:bg-[#1E1F22] py-3">
            <NavigationAction/>
        </div>
    
    )
}