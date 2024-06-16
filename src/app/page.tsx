
import { auth } from "@/lib/authentication/auth";
import { getToken } from "next-auth/jwt";

import HomePage from "@/components/homepage/home";


export default async function Home() {
  const session = await auth()
  
  console.log(session)


  return (
    <main className="">
      <HomePage/>
    </main>
  )
}
