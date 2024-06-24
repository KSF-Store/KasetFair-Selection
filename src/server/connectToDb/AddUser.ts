export default async function OnAddUserToDb(user: any) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    try {
        const response = await fetch(`${baseUrl}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user?.email,
                name: user?.name,
                role: user?.role,
            }),
        });
        if (!response.ok) {
            throw new Error("Something bad happen in OnAddUserToDb");
        }

        // console.log(await response.json());
    } catch (error: any) {
        console.log(error);
    }
}
