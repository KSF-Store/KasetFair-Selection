import OnGetCurrentUser from "@/utils/getSession/getCurrentUser";


export default async function OnAddUserToDb(){
    const user = await OnGetCurrentUser()
    const response = await fetch('api/users/user',{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email : user?.email,
            name : user?.name ,
            role : user?.role
        }),
    })
    

}
