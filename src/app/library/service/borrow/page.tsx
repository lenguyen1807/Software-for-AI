import { Book } from "@/lib/interface";
import { BorrowHistory } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import ServiceTableBorrow from "@/components/library/service-table/borrow/table";
import { SessionProvider } from "next-auth/react";
import { GetBooks } from "@/lib/api";
import { auth } from "@/lib/auth";

export default async function ManagBorrow() {
    const user = (await auth())?.user;

    const res = await fetch(ResolveURL("libraries/borrows?get_all=true"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user.jwt}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const service = (await res.json()) as BorrowHistory[];
    return (
        <SessionProvider>
            <ServiceTableBorrow data={service} />
        </SessionProvider>
    );
}