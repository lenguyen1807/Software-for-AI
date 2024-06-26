import { GetBookRecommend, GetBookByID } from "@/lib/api";
import BookCard from "./book-card";

export default async function RecommendSection({userID} : {userID: string}) {
    const recBooksID = await GetBookRecommend(userID, 8);
    const recBooks = await Promise.all(
        recBooksID.map(async (id: string) => {
            const book = await GetBookByID(id);
            return book;
        })
    )

    return (
        <>
            {recBooks.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    classNameImage="border-none w-[150px] h-[230px] flex-none"
                    className="w-[150px] items-center"
                />
            ))}
        </>
    )
}