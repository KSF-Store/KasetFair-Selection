import NextAuth from "next-auth"

import { authOptions } from "@/lib/authentication/authOptions"

export const { handlers , signIn, signOut, auth } = NextAuth(authOptions)