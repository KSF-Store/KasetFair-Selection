import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth/authOptions"

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)