import { Book } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import BookLibTable from "@/components/library/book-table/table";
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react";
import { GetLibraryInfo } from "@/lib/api";

export default async function Page() {
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
    const info = await GetLibraryInfo(user.jwt);
    
    return (
        <main>
            <SessionProvider>
                <BookLibTable data={books} lib={info[0]} token={user.jwt} />
            </SessionProvider>
        </main>
    );
}