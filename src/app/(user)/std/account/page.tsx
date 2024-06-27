import React from "react";

import UserDetail from "@/interface/account/userDetail";
import SignoutTemp from "@/components/authen/signOut/signoutTemp";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-[2vh]">
            <UserDetail />
            <Link href="/register">Click me!</Link>
            <SignoutTemp />
        </section>
    );
}
