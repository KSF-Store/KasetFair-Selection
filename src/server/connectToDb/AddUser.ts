import axios from "axios";

export default async function OnAddUserToDb(user: any) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    try {
        const mockup = {
            nisitId: "6510503565",
            role: "std",
            name: "Ponthep Ho",
            faculty: "ComEn",
            year: 3,
            address: "Chatuchak Bangkok",
            phone: "0912345678",
            reservePhone1: "0987654321",
        };
        const body = mockup;
        // const body = {
        //     email: user?.email,
        //     name: user?.name,
        //     role: user?.role,
        // };
        const response = await axios.post(`${baseUrl}/api/user`, body);
        console.log(response);
        // if (response.) {
        //     throw new Error("Something bad happen in OnAddUserToDb");

        // console.log(await response.json());
    } catch (error: any) {
        console.log(error);
    }
}
