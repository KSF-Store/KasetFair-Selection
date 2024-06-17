
import { auth } from "@/lib/authentication/auth";
import OnAddUserToDb from "@/server/connectToDb/AddUser";

import HomePage from "@/components/homepage/home";



export default async function Home() {
  const session = await auth()
  if (session?.user){
    //if already logged in
    // await OnAddUserToDb()
  }
  console.log(session)
  return (
    <main className="">
      <HomePage/>
    </main>
  )
}
