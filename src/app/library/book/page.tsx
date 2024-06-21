import { Book } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import BookLibTable from "@/components/library/book-table/table";
import { SessionProvider } from "next-auth/react";
import {auth} from "@/lib/auth"



export default async function ManageBook() {
    const user = (await auth())?.user;

    const res = await fetch(ResolveURL("libraries/books?get_all=true"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user.jwt}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const books = (await res.json()) as Book[];
    
    return (
        <SessionProvider>
            <BookLibTable data={books} />
        </SessionProvider>
    );
}