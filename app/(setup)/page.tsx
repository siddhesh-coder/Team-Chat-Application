import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.post.findFirst({
       where: {
         members: {
            some: {
                userId: profile.id
            }
         }
       }
    });

    if(server){
       return redirect(`/posts/${server.id}`);
    }

    return <InitialModal/>;
}
 
export default SetupPage;