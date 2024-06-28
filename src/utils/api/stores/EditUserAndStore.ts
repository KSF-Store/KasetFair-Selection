import axios from "axios";

import { StoreEditPayload } from "@/interface/payloadType";

export default async function EditUserAndStore(props: StoreEditPayload) {
    try {
        const { User, Store } = props;
        const response = await axios.post("/api/user/store/register", {
            User,
            Store,
        });
        const data = response.data;
        console.log(data);
        return response;
    } catch (error) {
        console.error("Error creating store:", error);
    }
}
