import { auth } from "@/lib/auth";
import { ResolveURL } from "@/lib/utils";
import { User } from "@/lib/interface";
import AccountAdminTable from "@/components/admin/account-table/table";
import { SessionProvider } from "next-auth/react";

export default async function ManageAccount() {
    const token = (await auth())?.user.jwt;

    const res = await fetch(ResolveURL("user?get_all=true"), {
        method: "GET",
        next: { revalidate: 30 * 60 },
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = (await res.json()) as User[];

    return (
        <SessionProvider>
            <AccountAdminTable data={data} />
        </SessionProvider>
    )
}