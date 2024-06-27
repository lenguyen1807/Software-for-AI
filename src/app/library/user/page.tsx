import { User, UserJoin } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import UserTable from "@/components/library/user-table/table";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth"
import { GetLibraryInfo } from "@/lib/api";

export default async function ManageUser() {
    const data = (await auth())?.user;
    const info = await GetLibraryInfo(data.jwt);

    const memberRes = await fetch(ResolveURL("libraries/members?get_all=true"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${data.jwt}`
        }
    });
    const members = ((await memberRes.json()) as User[]).map((user): UserJoin => {
        return {...user, libCheck: true}
    });

    const joinRes = await fetch(ResolveURL("libraries/members/requests"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${data.jwt}`
        }
    })
    const joins =((await joinRes.json()) as UserJoin[]).map((join): UserJoin => {
        return {...join, libCheck: false}
    });

    return (
        <SessionProvider>
            <UserTable data={[...members, ...joins]} />
        </SessionProvider>
    );
}