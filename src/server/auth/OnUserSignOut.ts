'use server'

import { signOut } from "@/lib/authentication/auth"

export default async function OnUserSignOut () {
    await signOut({redirectTo: '/'})
}