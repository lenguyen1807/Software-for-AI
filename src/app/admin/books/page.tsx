import { Book } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import BookAdminTable from "@/components/admin/book-table/table";
import { SessionProvider } from "next-auth/react";

export default async function ManageBook() {
    const res = await fetch(ResolveURL("books?get_all=true"), {
        method: "GET",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const books = (await res.json()) as Book[];

    return (
        <SessionProvider>
            <BookAdminTable data={books} />
        </SessionProvider>
    );
}