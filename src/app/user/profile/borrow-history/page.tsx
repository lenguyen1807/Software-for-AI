import { DataTable } from "@/components/user/history-table";
import { GetBookByID, GetLibraryByID, GetUserBorrows } from "@/lib/api";
import { auth } from "@/lib/auth";
import { columns } from "@/components/user/borrow-column"

export default async function History() {
    const user = (await auth())?.user;
    const borrows = await GetUserBorrows(user.jwt);

    const data = await Promise.all(
        borrows.map(async (item: any) => {
            const book = await GetBookByID(item.bookID);
            const lib = await GetLibraryByID(item.libraryID);
            return {
                ...item,
                bookTitle: book.title,
                library: lib.name,
                status: item.status === 'not returned' ? 'Đang mượn' : 'Đã trả'
            };
        })
    );

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}