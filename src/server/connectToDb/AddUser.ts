

export default async function OnAddUserToDb(user : any){
    const response = await fetch('/api/users/user',{
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
