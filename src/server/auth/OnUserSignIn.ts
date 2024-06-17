'use server'


import { signIn } from "@/lib/authentication/auth"

import OnAddUserToDb from "../connectToDb/AddUser"


export default async function OnUserSignIn (action: string) {
    await signIn(action,{redirectTo: '/account'})
}