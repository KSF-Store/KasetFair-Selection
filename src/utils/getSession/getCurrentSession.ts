'use server'

import { auth } from "@/lib/authentication/auth"

import { redirect } from "next/navigation"

export default async function OnGetCurrentSession(){
    const session = await auth() 

    if (!session?.user?.id){
        //if user isn't existed
        return redirect('/')
    }
    else {
        return session
    }
}