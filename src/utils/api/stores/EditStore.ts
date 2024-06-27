import axios from "axios";

import { StoreEditPayload } from "@/interface/payloadType";

export default async function EditStore(props : StoreEditPayload){
    try {
        const response = await axios.post("/api/user/stores/register", {
            user : props.User,
            store : props.Store,
        });
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error("Error creating store:", error);
    }
    
}