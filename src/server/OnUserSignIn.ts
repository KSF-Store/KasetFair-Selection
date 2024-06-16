'use server'

import { signIn } from "@/lib/authentication/auth"

export default async function OnUserSignIn (action: string) {
    await signIn(action,{redirectTo: '/account'})

}