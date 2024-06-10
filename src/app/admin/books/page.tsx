import { Book } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils"
import BookAdminTable from "@/components/admin/book-table/table";
import { type TableProps } from "@/components/admin/book-table/columns";
import { GetLibraryByID } from "@/lib/api";
import { ToDateID } from "@/lib/utils";

async function AddProps(books: Book[]) {
    const props = await Promise.all(books.map(async book => {
        const library = await GetLibraryByID(book.libraryID);
        return {
            ...book,
            status: "Đang hoạt động",
            library: library.name,
            importDate: ToDateID(library._id)
        }
    }) as Promise<TableProps>[]);
    return props;
}

export default async function ManageBook() {
    const res = await fetch(ResolveURL("books?get_all=true"), {
        method: "GET",
        next: { revalidate: 30 * 60 }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const books = (await res.json()) as Book[];
    const tableProps = await AddProps(books.slice(0, 10));
   
    return <BookAdminTable data={tableProps} />;
}