import React from "react";

import AdminDashboard from "@/components/admin/dashboard/adminDashboard";

type Props = {};

export default function page({}: Props) {
    return (
        <section>
            <AdminDashboard />
        </section>
    );
}
