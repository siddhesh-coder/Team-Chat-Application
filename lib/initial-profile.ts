import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () =>{
    const profile = await currentUser();

    if(!profile){
        return redirectToSignIn();
    }

    const user = await db.user.findUnique({
        where: {
            userId: profile.id
        }
    })

    if(user){
        return user;
    }

    const newUser = await db.user.create({
        data: {
            userId: profile.id,
            name: `${profile.firstName} ${profile.lastName}`,
            imageUrl: profile.imageUrl,
            email: profile.emailAddresses[0].emailAddress
        }
    });
    
    return newUser;
};