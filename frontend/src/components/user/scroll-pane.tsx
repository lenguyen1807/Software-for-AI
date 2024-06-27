import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import BookCard from "@/components/user/book-card";
import { Book } from "@/lib/interface";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    books: Book[],
    wBook: string,
    hBook: string,
    classNameImg: string,
    classNameCard: string
}

export default function ScrollPane({
    books,
    ...props
} : Props) {
    return (
        <ScrollArea 
            className={cn("whitespace-nowrap", props.className)}
        >
            <div className="flex p-6 justify-between">
                {books.map((book) => (
                    <BookCard 
                        book={book} 
                        // hrefView={`user/book/${book._id}`}
                        // hrefBorrow={`user/book/${book._id}`}
                        width={props.wBook}
                        height={props.hBook}
                        key={book._id}
                        classNameImage={props.classNameImg}
                        className={props.classNameCard}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}