import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";

import { redirect } from "next/navigation";

import { NavigationAction } from "./navigation-action";



export const NavigationSidebar = async () => {

   const profile = await currentProfile();

   if(!profile){
     return redirect("/");
   }

   const servers = await db.post.findMany({
      where: {
         members: {
            some: {
               userId: profile.id
            }
         }
      }
   });

    return ( 
        <div 
        className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
           <NavigationAction/>
           <Separator
             className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-12 mx-auto" />
           <ScrollArea className="flex-1 w-full">
              {servers.map((server) =>(
                  <div key={server.id} className="mb-4">
                    {/* <NavigationItem/> */}
                  </div>
               ))}
           </ScrollArea>
        </div>
     );
}