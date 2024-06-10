import { DataTable } from "@/components/user/history-table";
import { GetBookByID, GetLibraryByID, GetUserBorrows } from "@/lib/api";
import { BorrowHistory } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<BorrowHistory>[] = [
    {
        accessorKey: "borrowDate",
        header: "Ngày mượn",
    },
    {
        accessorKey: "returnDate",
        header: "Ngày trả",
    },
    {
        accessorKey: "bookTitle",
        header: "Tiêu đề",
    },
    {
        accessorKey: "library",
        header: "Thư viện",
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
    },
]

export default async function History() {
    const borrows = await GetUserBorrows();

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