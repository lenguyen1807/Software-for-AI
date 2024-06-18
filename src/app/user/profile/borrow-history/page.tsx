import { DataTable } from "@/components/user/history-table";
import { GetBookByID, GetLibraryByID, GetUserBorrows } from "@/lib/api";
import { auth } from "@/lib/auth";
import { columns } from "@/components/user/borrow-column"
import { Book, BorrowHistory } from "@/lib/interface";

function GetStatus(item: BorrowHistory) {
    const returnDate = new Date(item.returnDate);
    if (returnDate < new Date()) {
        return "dated";
    }
    return item.status === "not returned" ? "not returned" : "returned";
}

export default async function History() {
    const user = (await auth())?.user;
    const borrows = await GetUserBorrows(user.jwt);

    const data = await Promise.all(
        borrows.map(async (item: BorrowHistory) => {
            const book = await GetBookByID(item.bookID);
            const lib = await GetLibraryByID(item.libraryID);
            return {
                ...item,
                bookTitle: book.title,
                library: lib.name,
                status: GetStatus(item) 
            };
        })
    );

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}