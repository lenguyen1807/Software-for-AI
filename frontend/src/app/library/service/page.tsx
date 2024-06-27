import { auth } from "@/lib/auth";
import { ResolveURL } from "@/lib/utils";
import { BorrowHistory } from "@/lib/interface";
import { SessionProvider } from "next-auth/react";
import ServiceTable from "@/components/library/service-table/table";
import { GetBookByID } from "@/lib/api";
import { type UserBorrow } from "@/lib/interface";
import { User } from "@/lib/interface";

export default async function Page() {
    const data = (await auth())?.user;
    const borrowRes = await fetch(ResolveURL("libraries/borrows?get_all=true"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${data.jwt}`
        }
    });
    const borrows = (await borrowRes.json());

    const borrowData = await Promise.all(
        borrows.map(async (item: any): Promise<UserBorrow> => {
            const book = await GetBookByID(item.bookID);
            return {
                bookTitle: String(book.title),
                bookID: String(item.bookID),
                userID: String(item.userID),
                libraryID: String(item.userID),
                borrowDate: String(item.borrowDate),
                returnDate: String(item.returnDate),
                username: String(item.name),
                _id: String(item._id),
                status: Boolean(item.status)
            }
        })
    )

    return (
        <SessionProvider>
            <ServiceTable data={borrowData} />
        </SessionProvider>
    );
}