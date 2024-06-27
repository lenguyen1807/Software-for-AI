import { GetUserBorrows, GetBookByID } from "@/lib/api";
import { BorrowHistory } from "@/lib/interface";
import HorizontalBookCard from "./horizontal-book-card";

export default async function BorrowSection({token} : {token: string}) {
    const borrows = await GetUserBorrows(token);
    const data = await Promise.all(
        borrows.map(async (item: BorrowHistory) => {
            const book = await GetBookByID(item.bookID);
            return book;
        })
    );

    return (
        <>
            {data.map((book) => (
                <HorizontalBookCard
                    book={book}
                    width={"64px"}
                    height={"88px"}
                    key={book._id}
                    classNameImage=""
                    className="flex gap-[25px] p-3"
                />
            ))}
        </>
    )
}