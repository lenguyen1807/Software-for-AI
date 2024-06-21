import { User } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import UserTable from "@/components/library/user-table/table";
import { SessionProvider } from "next-auth/react";
import{auth} from "@/lib/auth"

export default async function ManageUser() {
    const user = (await auth())?.user;

    const res = await fetch(ResolveURL("libraries/members?get_all=true"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user.jwt}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const users = (await res.json()) as User[];

    return (
        <SessionProvider>
            <UserTable data={users} />
        </SessionProvider>
    );
}